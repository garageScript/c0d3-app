import * as Yup from 'yup'

const REGEX_ALPHANUMERICS_AND_SPACE = /^[a-zA-Z0-9_\s]*$/

const requirements = {
  TEXT_MIN: 2,
  TEXT_MAX: 64,
  PASSWORD_MIN: 6
}

const errorMessages = {
  REQUIRED: 'Required',
  LEADING_TRAILING: 'Leading and trailing value must be alphanumeric character',
  NUMBERS_ONLY: 'Numbers only',
  POSITIVE_NUMBERS_ONLY: 'Positive numbers only',
  ALPHA_NUM_CHARS: 'Must be alphanumerics characters',
  MUST_BE_LOWERCASE: 'Must be a lowercase string',
  INVALID_EMAIL: 'Invalid email address',
  PASSWORD_MUST_MATCH: 'Password must match',
  AT_LEAST_TEXT_MIN_CHARS: `Must be at least ${requirements.TEXT_MIN} characters`,
  AT_LEAST_TEXT_MAX_CHARS: `Must be ${requirements.TEXT_MAX} characters or less`,
  AT_LEAST_PASSWORD_MIN_CHARS: `Must be at least ${requirements.PASSWORD_MIN} characters`
}

const alertValidation = Yup.object({
  text: Yup.string().required(errorMessages.REQUIRED).strict(true),
  type: Yup.string().required(errorMessages.REQUIRED).strict(true),
  url: Yup.string(),
  urlCaption: Yup.string()
})

const challengeSchema = Yup.object({
  title: Yup.string().required(errorMessages.REQUIRED).strict(true),
  description: Yup.string().required(errorMessages.REQUIRED).strict(true),
  order: Yup.number()
    .required(errorMessages.REQUIRED)
    .typeError(errorMessages.NUMBERS_ONLY)
    .min(0, errorMessages.POSITIVE_NUMBERS_ONLY)
    .strict(true)
})

const lessonSchema = Yup.object({
  title: Yup.string().required(errorMessages.REQUIRED).strict(true),
  description: Yup.string().required(errorMessages.REQUIRED).strict(true),
  docUrl: Yup.string(),
  githubUrl: Yup.string(),
  videoUrl: Yup.string(),
  order: Yup.number()
    .required(errorMessages.REQUIRED)
    .typeError(errorMessages.NUMBERS_ONLY)
    .min(0, errorMessages.POSITIVE_NUMBERS_ONLY)
    .strict(true),
  slug: Yup.string().required(errorMessages.REQUIRED).strict(true),
  chatUrl: Yup.string()
})

const signupValidation = Yup.object({
  email: Yup.string()
    .email(errorMessages.INVALID_EMAIL)
    .required(errorMessages.REQUIRED),
  username: Yup.string()
    .strict(true)
    .lowercase(errorMessages.MUST_BE_LOWERCASE)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, errorMessages.ALPHA_NUM_CHARS)
    .min(requirements.TEXT_MIN, errorMessages.AT_LEAST_TEXT_MIN_CHARS)
    .max(requirements.TEXT_MAX, errorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .trim(errorMessages.LEADING_TRAILING)
    .required(errorMessages.REQUIRED),
  firstName: Yup.string()
    .strict(true)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, errorMessages.ALPHA_NUM_CHARS)
    .min(requirements.TEXT_MIN, errorMessages.AT_LEAST_TEXT_MIN_CHARS)
    .max(requirements.TEXT_MAX, errorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .trim(errorMessages.LEADING_TRAILING)
    .required(errorMessages.REQUIRED),
  lastName: Yup.string()
    .strict(true)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, errorMessages.ALPHA_NUM_CHARS)
    .min(requirements.TEXT_MIN, errorMessages.AT_LEAST_TEXT_MIN_CHARS)
    .max(requirements.TEXT_MAX, errorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .trim(errorMessages.LEADING_TRAILING)
    .required(errorMessages.REQUIRED),
  password: Yup.string()
    .min(requirements.PASSWORD_MIN, errorMessages.AT_LEAST_PASSWORD_MIN_CHARS)
    .max(requirements.TEXT_MAX, errorMessages.AT_LEAST_TEXT_MAX_CHARS)
})

const loginValidation = Yup.object({
  username: Yup.string()
    .strict(true)
    .lowercase(errorMessages.MUST_BE_LOWERCASE)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, errorMessages.ALPHA_NUM_CHARS)
    .min(requirements.TEXT_MIN, errorMessages.AT_LEAST_TEXT_MIN_CHARS)
    .max(requirements.TEXT_MAX, errorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .trim(errorMessages.LEADING_TRAILING)
    .required(errorMessages.REQUIRED),
  password: Yup.string()
    .min(requirements.PASSWORD_MIN, errorMessages.AT_LEAST_PASSWORD_MIN_CHARS)
    .max(requirements.TEXT_MAX, errorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .required(errorMessages.REQUIRED)
})

const passwordValidation = Yup.object({
  password: Yup.string()
    .min(requirements.PASSWORD_MIN, errorMessages.AT_LEAST_PASSWORD_MIN_CHARS)
    .max(requirements.TEXT_MAX, errorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .required(errorMessages.REQUIRED)
})

const confirmPasswordValidation = Yup.object({
  password: Yup.string()
    .min(requirements.PASSWORD_MIN, errorMessages.AT_LEAST_PASSWORD_MIN_CHARS)
    .max(requirements.TEXT_MAX, errorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .required(errorMessages.REQUIRED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], errorMessages.PASSWORD_MUST_MATCH)
    .required(errorMessages.REQUIRED)
})

const resetPasswordValidation = Yup.object({
  userOrEmail: Yup.string()
    .min(requirements.TEXT_MIN, errorMessages.AT_LEAST_TEXT_MIN_CHARS)
    .required(errorMessages.REQUIRED)
})

const exercisesValidation = Yup.object({
  description: Yup.string().required(errorMessages.REQUIRED),
  answer: Yup.string().required(errorMessages.REQUIRED),
  explanation: Yup.string().required(errorMessages.REQUIRED)
})

export {
  alertValidation,
  challengeSchema,
  lessonSchema,
  signupValidation,
  loginValidation,
  passwordValidation,
  confirmPasswordValidation,
  resetPasswordValidation,
  exercisesValidation
}
