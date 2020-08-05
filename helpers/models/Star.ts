import { Model, DataTypes } from 'sequelize'

export class Star extends Model {
  public id!: number
  public lessonId!: number
  public comment!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const StarTypes = {
  lessonId: DataTypes.INTEGER,
  comment: DataTypes.STRING
}
