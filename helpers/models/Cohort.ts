import { Model, DataTypes } from 'sequelize'

export class Cohort extends Model {
  public id!: number
  public chatroomId!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const CohortTypes = { chatRoomId: DataTypes.STRING }
