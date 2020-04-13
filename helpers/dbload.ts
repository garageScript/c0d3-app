import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DB_NAME || 'you',
  process.env.DB_USER || 'failed',
  process.env.DB_PW || 'this',
  {
    host: process.env.DB_HOST || 'city',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

class Announcement extends Model {
  public id!: number
  public description!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Announcement.init(
  {
    description: new DataTypes.TEXT()
  },
  {
    tableName: 'announcements',
    sequelize
  }
)

class Lesson extends Model {
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

Lesson.init(
  {
    description: DataTypes.TEXT,
    docUrl: DataTypes.STRING,
    githubUrl: DataTypes.STRING,
    videoUrl: DataTypes.STRING,
    order: DataTypes.INTEGER,
    title: DataTypes.STRING,
    chatUrl: DataTypes.STRING
  },
  {
    tableName: 'lessons',
    sequelize
  }
)

class User extends Model {
  public id!: number
  public username!: string
  public password!: string
  public email!: string
  public gsId?: number
  public isOnline!: boolean
  public isAdmin!: boolean
  public forgotToken?: string
  public cliToken?: string
  public emailVerificationToken?: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    gsId: DataTypes.INTEGER,
    isOnline: DataTypes.BOOLEAN,
    isAdmin: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    forgotToken: DataTypes.STRING,
    cliToken: DataTypes.STRING,
    emailVerificationToken: DataTypes.STRING
  },
  {
    tableName: 'users',
    sequelize
  }
)

class UserLesson extends Model {
  public id!: number
  public isPassed?: string
  public isTeaching?: string
  public isEnrolled?: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

UserLesson.init(
  {
    isPassed: DataTypes.STRING,
    isTeaching: DataTypes.STRING,
    isEnrolled: DataTypes.STRING
  },
  {
    tableName: 'userLessons',
    sequelize
  }
)

class Submission extends Model {
  public id!: number
  public mrUrl?: string
  public diff!: string
  public comment?: string
  public status!: string
  public viewCount?: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Submission.init(
  {
    mrUrl: DataTypes.STRING,
    diff: DataTypes.TEXT,
    comment: DataTypes.TEXT,
    status: DataTypes.STRING,
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    tableName: 'submissions',
    sequelize
  }
)

class AdoptedStudent extends Model {
  public id!: number
  public lessonId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

AdoptedStudent.init(
  {
    lessonId: DataTypes.INTEGER
  },
  {
    tableName: 'adoptedStudents',
    sequelize
  }
)

class Challenge extends Model {
  public id!: number
  public status!: string
  public description!: string
  public title!: string
  public order!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Challenge.init(
  {
    status: DataTypes.STRING,
    description: DataTypes.TEXT,
    title: DataTypes.STRING,
    order: DataTypes.INTEGER
  },
  {
    tableName: 'challenges',
    sequelize
  }
)

class Star extends Model {
  public id!: number
  public lessonId!: number
  public comment!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Star.init(
  {
    lessonId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  },
  {
    tableName: 'stars',
    sequelize
  }
)

Lesson.hasMany(Challenge)
Lesson.belongsToMany(User, {
  through: {
    model: UserLesson
  }
})

Star.belongsTo(User, { as: 'student' })
Star.belongsTo(User, { as: 'mentor' })

Submission.belongsTo(User)
Submission.belongsTo(User, { as: 'reviewer' })
Submission.belongsTo(Challenge)
Submission.belongsTo(Lesson)

// Not so necessary
Lesson.hasMany(Submission)
Challenge.hasMany(Submission)

User.belongsToMany(User, { as: 'student', through: AdoptedStudent })
User.belongsToMany(Lesson, { through: { model: UserLesson } })

class Cohort extends Model {
  public id!: number
  public chatroomId!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Cohort.init(
  {
    chatRoomId: DataTypes.STRING
  },
  {
    tableName: 'cohorts',
    sequelize
  }
)

class WaitList extends Model {
  public id!: number
  public email!: string
  public token!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

WaitList.init(
  {
    email: DataTypes.STRING,
    token: DataTypes.STRING
  },
  {
    tableName: 'waitLists',
    sequelize
  }
)

WaitList.belongsTo(Cohort)

sequelize.sync({ alter: true })

export default {
  Announcement,
  Lesson,
  Cohort,
  Challenge,
  Submission,
  User,
  Star,
  AdoptedStudent,
  UserLesson,
  WaitList,
  sequelize
}
