import { Sequelize } from 'sequelize'
import { Lesson, LessonTypes } from './models/Lesson'
import { User, UserTypes } from './models/User'
import { UserLessonTypes, UserLesson } from './models/UserLesson'
import { SubmissionTypes, Submission } from './models/Submission'
import { ChallengeTypes, Challenge } from './models/Challenge'
import { AlertTypes, Alert } from './models/Alert'

const sequelize = new Sequelize(
  process.env.DB_NAME || 'you',
  process.env.DB_USER || 'failed',
  process.env.DB_PW || 'this',
  {
    host: process.env.DB_HOST || 'city',
    logging: false,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
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

sequelize.sync({ alter: false })

export default {
  Lesson,
  Challenge,
  Submission,
  User,
  UserLesson,
  Alert,
  sequelize
}
