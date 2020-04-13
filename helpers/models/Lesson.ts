import { DataTypes, Model } from 'sequelize'

export class Lesson extends Model {
  public id!: number
  public description!: string
  public docUrl?: string
  public githubUrl?: string
  public videoUrl?: string
  public order!: number
  public titel!: string
  public chatUrl?: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const LessonTypes = {
  description: DataTypes.TEXT,
  docUrl: DataTypes.STRING,
  githubUrl: DataTypes.STRING,
  videoUrl: DataTypes.STRING,
  order: DataTypes.INTEGER,
  title: DataTypes.STRING,
  chatUrl: DataTypes.STRING
}
