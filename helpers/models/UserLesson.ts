import { Model, DataTypes } from 'sequelize'

export class UserLesson extends Model {
  public id!: number
  public isPassed?: string
  public isTeaching?: string
  public isEnrolled?: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const UserLessonTypes = {
  isPassed: DataTypes.STRING,
  isTeaching: DataTypes.STRING,
  isEnrolled: DataTypes.STRING
}
