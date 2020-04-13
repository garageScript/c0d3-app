import { Model, DataTypes } from 'sequelize'

export class WaitList extends Model {
  public id!: number
  public email!: string
  public token!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const WaitListTypes = {
  email: DataTypes.STRING,
  token: DataTypes.STRING
}
