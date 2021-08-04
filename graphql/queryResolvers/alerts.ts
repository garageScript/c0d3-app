import prisma from '../../prisma'

export const alerts = () => prisma.alert.findMany()
