import { Sequelize } from 'sequelize'
import { Lesson, LessonTypes } from './models/Lesson'
import { User, UserTypes } from './models/User'
import { UserLessonTypes, UserLesson } from './models/UserLesson'
import { SubmissionTypes, Submission } from './models/Submission'
import { ChallengeTypes, Challenge } from './models/Challenge'

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
  foreignKey: 'lessonId', // Defaults to LessonId
  through: { model: UserLesson }
})

Submission.belongsTo(User)
Submission.belongsTo(User, { as: 'reviewer' })
Submission.belongsTo(Challenge)
Submission.belongsTo(Lesson)

// Not so necessary
Lesson.hasMany(Submission)
Challenge.hasMany(Submission)

User.belongsToMany(Lesson, {
  foreignKey: 'userId', // Defaults to UserId
  through: { model: UserLesson }
})

sequelize.sync({ alter: false }) // We do not want this affect to production at the moment.

export default {
  Lesson,
  Challenge,
  Submission,
  User,
  UserLesson,
  sequelize
}
