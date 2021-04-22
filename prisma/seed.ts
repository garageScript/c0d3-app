import type { Challenge, Lesson, User } from '@prisma/client'
import { Prisma, PrismaClient } from '@prisma/client'
import { SubmissionStatus } from '../graphql'
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
  await seedLessons()
  const [admin, leet, noob] = await seedUsers()
  const lessons = await prisma.lesson.findMany({
    include: { challenges: true }
  })
  await seedUserLessons(admin, lessons)
  await seedUserLessons(leet, lessons)
  await seedSubmissions(leet, admin, lessons, SubmissionStatus.Passed)
  await seedSubmissions(noob, null, lessons.slice(0, 1), SubmissionStatus.Open)
  await seedStars(leet, admin, lessons)
}

async function seedLessons() {
  for (const lessonData of lessonsData) {
    await prisma.lesson.create({ data: lessonData })
  }
}

async function seedUsers() {
  const admin = await prisma.user.create({ data: adminData })
  const leet = await prisma.user.create({ data: leetData })
  const noob = await prisma.user.create({ data: noobData })
  return [admin, leet, noob]
}

async function seedUserLessons(user: User, lessons: Lesson[]) {
  await prisma.userLesson.createMany({
    data: lessons.map(({ id }) => userLessonData(id, user.id))
  })
}

async function seedSubmissions(
  user: User,
  reviewer: User | null,
  lessons: (Lesson & { challenges: Challenge[] })[],
  status?: SubmissionStatus
) {
  await prisma.submission.createMany({
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
  await prisma.star.createMany({
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
