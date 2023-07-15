import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import prisma from '../../prisma'

jest.mock('../../prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

beforeEach(() => {
  mockReset(prismaMock)
  prismaMock.$transaction.mockImplementation((ops: any) => Promise.all(ops))
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

export default prismaMock
