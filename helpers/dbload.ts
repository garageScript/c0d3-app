import { Sequelize } from 'sequelize'
import { Lesson, LessonTypes } from './models/Lesson'
import { User, UserTypes } from './models/User'
import { UserLessonTypes, UserLesson } from './models/UserLesson'
import { SubmissionTypes, Submission } from './models/Submission'
import { ChallengeTypes, Challenge } from './models/Challenge'
import { AlertTypes, Alert } from './models/Alert'
import { StarTypes, Star } from './models/Star'

/* istanbul ignore next */
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST,
    logging: false,
    port: parseInt(process.env.DB_PORT as string),
    dialect: 'postgres',
    pool: {
      max: process.env.VERCEL_REGION ? 1 : 5,
      min: 0,
      acquire: process.env.VERCEL_REGION ? 3000 : 30000,
      idle: process.env.VERCEL_REGION ? 0 : 10000
    }
  }
)

Alert.init(AlertTypes, {
  tableName: 'alerts',
  sequelize
})

Lesson.init(LessonTypes, {
  tableName: 'lessons',
  sequelize
})

User.init(UserTypes, {
  tableName: 'users',
  sequelize
})

UserLesson.init(UserLessonTypes, {
  tableName: 'userLessons',
  sequelize
})

Submission.init(SubmissionTypes, {
  tableName: 'submissions',
  sequelize
})

Challenge.init(ChallengeTypes, {
  tableName: 'challenges',
  sequelize
})

Star.init(StarTypes, {
  tableName: 'stars',
  sequelize
})

Lesson.hasMany(Challenge, {
  as: 'challenges', // Defaults to Challenges
  foreignKey: 'lessonId'
})
Lesson.belongsToMany(User, {
  as: 'lesson',
  foreignKey: 'lessonId', // Defaults to LessonId
  through: { model: UserLesson }
})

Submission.belongsTo(User, { as: 'user' })
Submission.belongsTo(User, { as: 'reviewer' })
Submission.belongsTo(Challenge, { as: 'challenge' })
Submission.belongsTo(Lesson, { as: 'lesson' })

Star.belongsTo(User, { as: 'student' })
Star.belongsTo(User, { as: 'mentor' })

User.belongsToMany(Lesson, {
  foreignKey: 'userId', // Defaults to UserId
  through: { model: UserLesson }
})

User.hasMany(Submission, {
  foreignKey: 'userId'
})

User.hasMany(UserLesson, {
  foreignKey: 'userId'
})

UserLesson.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

sequelize.sync({ alter: !!process.env.ALTER_DB })

export default {
  Lesson,
  Challenge,
  Submission,
  User,
  UserLesson,
  Alert,
  Star,
  sequelize
}

export { User, UserLesson }
