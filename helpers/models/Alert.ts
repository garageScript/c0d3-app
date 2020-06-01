import { Model, DataTypes } from 'sequelize'

export class Alert extends Model {
  public id!: number
  public text!: string
  public type!: string
  public url?: string
  public urlCaption?: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const AlertTypes = {
  text: DataTypes.STRING,
  type: DataTypes.STRING,
  url: DataTypes.STRING,
  urlCaption: DataTypes.STRING
}
