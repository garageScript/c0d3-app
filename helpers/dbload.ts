import { Sequelize } from 'sequelize'
import { Announcement, AnnouncementTypes } from './models/Announcement'
import { Lesson, LessonTypes } from './models/Lesson'
import { User, UserTypes } from './models/User'
import { UserLessonTypes, UserLesson } from './models/UserLesson'
import { SubmissionTypes, Submission } from './models/Submission'
import { AdoptedStudentTypes, AdoptedStudent } from './models/AdoptedStudent'
import { ChallengeTypes, Challenge } from './models/Challenge'
import { Star, StarTypes } from './models/Star'
import { CohortTypes, Cohort } from './models/Cohort'
import { WaitListTypes, WaitList } from './models/WaitList'

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

Announcement.init(AnnouncementTypes, {
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

AdoptedStudent.init(AdoptedStudentTypes, {
  tableName: 'adoptedStudents',
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

WaitList.init(WaitListTypes, {
  tableName: 'waitLists',
  sequelize
})

Cohort.init(CohortTypes, {
  tableName: 'cohorts',
  sequelize
})

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

WaitList.belongsTo(Cohort)

sequelize.sync({ alter: false }) // We do not want this affect to production at the moment.

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
