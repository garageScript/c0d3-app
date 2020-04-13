import { DataTypes, Model } from 'sequelize'

export class Announcement extends Model {
  public id!: number
  public description!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const AnnouncementTypes = {
  description: DataTypes.TEXT
}
