import { Model, DataTypes } from 'sequelize'

export class Alert extends Model {
  public id!: number
  public text!: string
  public type!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const AlertTypes = {
  id: DataTypes.NUMBER,
  text: DataTypes.STRING,
  type: DataTypes.STRING
}
