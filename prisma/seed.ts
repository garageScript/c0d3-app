import type { Challenge, Lesson, User } from '@prisma/client'
import { Prisma, PrismaClient } from '@prisma/client'
import { SubmissionStatus } from '../graphql'
import getExercisesData from '../__dummy__/getExercisesData'
import { modules as modulesData } from '../__dummy__/lessonData'
import {
  adminData,
  leetData,
  lessonsData,
  noobData,
  starData,
  submissionData,
  userLessonData
} from './seedData'

const prisma = new PrismaClient()

async function main() {
  const lessons = await seedLessons()
  const [admin, leet, noob] = await seedUsers()
  await seedUserLessons(admin, lessons)
  await seedUserLessons(leet, lessons)
  await seedSubmissions(leet, admin, lessons, SubmissionStatus.Passed)
  await seedSubmissions(noob, null, lessons.slice(0, 1), SubmissionStatus.Open)
  await seedStars(leet, admin, lessons)
  await seedModules(admin)
  await seedExercises(admin)
  await seedExercisesWithoutExplanation(admin)
}

async function seedLessons() {
  return prisma.$transaction(
    lessonsData.map(data =>
      prisma.lesson.create({ data, include: { challenges: true } })
    )
  )
}

async function seedModules(admin: User) {
  return prisma.$transaction(
    modulesData.map(data =>
      prisma.module.create({
        data: {
          content: data.content,
          // JS0
          lessonId: 1,
          authorId: admin.id,
          name: data.name,
          order: data.order
        }
      })
    )
  )
}

async function seedExercises(admin: User) {
  return prisma.$transaction(
    getExercisesData.exercises.map(data =>
      prisma.exercise.create({
        data: {
          moduleId: modulesData[0].id,
          authorId: admin.id,
          description: data.description,
          answer: data.answer,
          explanation: data.answer
        }
      })
    )
  )
}

async function seedExercisesWithoutExplanation(admin: User) {
  return prisma.$transaction(
    getExercisesData.exercises.map(data =>
      prisma.exercise.create({
        data: {
          moduleId: modulesData[1].id,
          authorId: admin.id,
          description: data.description,
          answer: data.answer
        }
      })
    )
  )
}

async function seedUsers() {
  return prisma.$transaction([
    prisma.user.create({ data: adminData }),
    prisma.user.create({ data: leetData }),
    prisma.user.create({ data: noobData })
  ])
}

async function seedUserLessons(user: User, lessons: Lesson[]) {
  return prisma.userLesson.createMany({
    data: lessons.map(({ id }) => userLessonData(id, user.id))
  })
}

async function seedSubmissions(
  user: User,
  reviewer: User | null,
  lessons: (Lesson & { challenges: Challenge[] })[],
  status?: SubmissionStatus
) {
  return prisma.submission.createMany({
    data: lessons.reduce(
      (acc, { challenges }) => [
        ...acc,
        ...challenges.map(({ id, lessonId }) =>
          submissionData(user.id, lessonId!, id, reviewer?.id, status)
        )
      ],
      [] as Prisma.SubmissionCreateManyInput[]
    )
  })
}

async function seedStars(user: User, mentor: User, lessons: Lesson[]) {
  return prisma.star.createMany({
    data: lessons.map(({ id }) => starData(id, user.id, mentor.id))
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
