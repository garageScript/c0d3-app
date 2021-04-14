import { PrismaClient } from '@prisma/client'
import lessonsData from './seedData'

const prisma = new PrismaClient()

async function seedLessons() {
  for (const lessonData of lessonsData) {
    const { challenges, ...lesson } = lessonData
    await prisma.lesson.create({
      data: {
        ...lesson,
        challenges: {
          createMany: {
            data: challenges
          }
        }
      }
    })
  }
}

async function seedUsers() {
  const admin = await prisma.user.create({
    data: {
      name: 'Admin Administrator',
      username: 'admin',
      password: '$2b$10$OKsH6r5//AtYlIW/EzUWQeUYdwcKF8JUEeD8RXfLURj8BPw1ilir2',
      email: 'admin@mail.com',
      isAdmin: true
    }
  })

  await prisma.user.create({
    data: {
      name: 'Noob Newbie',
      username: 'newbie',
      password: '$2b$10$1N3HMPuhWETfwWZWEJp85ONwWbUbBet7.aeZFvdCBjqx5muZ6Elyq',
      email: 'newbie@mail.com',
      isAdmin: false
    }
  })

  const userLessons = (await prisma.lesson.findMany()).map(l => ({
    lessonId: l.id,
    userId: admin.id,
    isPassed: Date.now().toString()
  }))

  await prisma.userLesson.createMany({
    data: userLessons
  })
}

async function main() {
  await seedLessons()
  await seedUsers()
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
