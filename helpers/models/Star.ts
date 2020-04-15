import { Model, DataTypes } from 'sequelize'

export class Star extends Model {
  public id!: number
  public lessonId!: number
  public comment!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const StarTypes = {
  status: DataTypes.STRING,
  description: DataTypes.TEXT,
  title: DataTypes.STRING,
  order: DataTypes.INTEGER
}
