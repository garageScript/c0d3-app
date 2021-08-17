import * as Yup from 'yup'

const TEXT_MIN = 2
const TEXT_MAX = 64
const PASSWORD_MIN = 6
const REGEX_ALPHANUMERICS_AND_SPACE = /^[a-zA-Z0-9_\s]*$/

const alertValidation = Yup.object({
  text: Yup.string().required('Required').strict(true),
  type: Yup.string().required('Required').strict(true),
  url: Yup.string(),
  urlCaption: Yup.string()
})

const lessonSchema = Yup.object({
  title: Yup.string().required('Required').strict(true),
  description: Yup.string().required('Required').strict(true),
  docUrl: Yup.string(),
  githubUrl: Yup.string(),
  videoUrl: Yup.string(),
  order: Yup.number()
    .required('Required')
    .typeError('Numbers only')
    .min(0, 'Positive numbers only')
    .strict(true),
  slug: Yup.string().required('Required').strict(true),
  chatUrl: Yup.string()
})

const signupValidation = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  username: Yup.string()
    .strict(true)
    .lowercase('Must be a lowercase string')
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, 'Must be alphanumerics characters')
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .trim('Leading and trailing value must be alphanumeric character')
    .required('Required'),
  firstName: Yup.string()
    .strict(true)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, 'Must be alphanumerics characters')
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .trim('Leading and trailing value must be alphanumeric character')
    .required('Required'),
  lastName: Yup.string()
    .strict(true)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, 'Must be alphanumerics characters')
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .trim('Leading and trailing value must be alphanumeric character')
    .required('Required')
})

const loginValidation = Yup.object({
  username: Yup.string()
    .strict(true)
    .lowercase('Must be a lowercase string')
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, 'Must be alphanumerics characters')
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .trim('Leading and trailing value must be alphanumeric character')
    .required('Required'),
  password: Yup.string()
    .min(PASSWORD_MIN, `Must be at least ${PASSWORD_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .required('Required')
})

const passwordValidation = Yup.object({
  password: Yup.string()
    .min(PASSWORD_MIN, `Must be at least ${PASSWORD_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .required('Required')
})

const confirmPasswordValidation = Yup.object({
  password: Yup.string()
    .min(PASSWORD_MIN, `Must be at least ${PASSWORD_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Password must match')
    .required('Required')
})

const resetPasswordValidation = Yup.object({
  userOrEmail: Yup.string()
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .required('Required')
})

export {
  alertValidation,
  lessonSchema,
  signupValidation,
  loginValidation,
  passwordValidation,
  confirmPasswordValidation,
  resetPasswordValidation
}
