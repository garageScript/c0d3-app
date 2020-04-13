import { Model, DataTypes } from 'sequelize'

export class Challenge extends Model {
  public id!: number
  public status!: string
  public description!: string
  public title!: string
  public order!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const ChallengeTypes = {
  status: DataTypes.STRING,
  description: DataTypes.TEXT,
  title: DataTypes.STRING,
  order: DataTypes.INTEGER
}
