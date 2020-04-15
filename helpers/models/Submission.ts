import { Model, DataTypes } from 'sequelize'

export class Submission extends Model {
  public id!: number
  public mrUrl?: string
  public diff!: string
  public comment?: string
  public status!: string
  public viewCount?: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const SubmissionTypes = {
  mrUrl: DataTypes.STRING,
  diff: DataTypes.TEXT,
  comment: DataTypes.TEXT,
  status: DataTypes.STRING,
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}
