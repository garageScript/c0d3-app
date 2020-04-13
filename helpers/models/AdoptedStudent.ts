import { DataTypes, Model } from 'sequelize'

export class AdoptedStudent extends Model {
  public id!: number
  public lessonId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const AdoptedStudentTypes = {
  lessonId: DataTypes.INTEGER
}
