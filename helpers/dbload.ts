import { Sequelize } from 'sequelize'
import { Lesson, LessonTypes } from './models/Lesson'
import { User, UserTypes } from './models/User'
import { UserLessonTypes, UserLesson } from './models/UserLesson'
import { Lesson as LesssonTypescriptTypes } from '../@types/lesson'
import { Challenge as ChallengeTypescriptTypes } from '../@types/challenge'
import { SubmissionTypes, Submission } from './models/Submission'
import { ChallengeTypes, Challenge } from './models/Challenge'
import { AlertTypes, Alert } from './models/Alert'
import { StarTypes, Star } from './models/Star'
import lessonData from '../__dummy__/lessonData'

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
  foreignKey: 'userId'
})

sequelize.sync({ alter: !!process.env.ALTER_DB })

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  //add data after fresh install
  Lesson.findAll({
    limit: 1
  }).then((lessons: Array<LesssonTypescriptTypes>) => {
    if (!lessons[0]) {
      Lesson.bulkCreate(lessonData)
      console.log('Successfully inserted lesson data')
    }
  })

  Challenge.findAll({
    limit: 1
  }).then((challenges: Array<ChallengeTypescriptTypes>) => {
    if (!challenges[0]) {
      lessonData.map(l => {
        //need to add lessonID to comply with Challenge schema
        let validChalleges: Array<ChallengeTypescriptTypes> = []
        l.challenges.forEach((c: ChallengeTypescriptTypes) =>
          validChalleges.push({ ...c, lessonId: l.id })
        )
        Challenge.bulkCreate(validChalleges)
      })
      console.log('Successfully inserted challenge data')
    }
  })
}
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
