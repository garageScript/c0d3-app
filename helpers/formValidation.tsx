import * as Yup from 'yup'

const Regex = {
  REGEX_ALPHANUMERICS_AND_SPACE: /^[a-zA-Z0-9_\s]*$/
}

const Requirements = {
  TEXT_MIN: 2,
  TEXT_MAX: 64,
  PASSWORD_MIN: 6
}

const ErrorMessages = {
  REQUIRED: 'Required',
  LEADING_TRAILING: 'Leading and trailing value must be alphanumeric character',
  NUMBERS_ONLY: 'Numbers only',
  POSITIVE_NUMBERS_ONLY: 'Positive numbers only',
  ALPHA_NUM_CHARS: 'Must be alphanumerics characters',
  MUST_BE_LOWERCASE: 'Must be a lowercase string',
  INVALID_EMAIL: 'Invalid email address',
  PASSWORD_MUST_MATCH: 'Password must match',
  AT_LEAST_TEXT_MIN_CHARS: `Must be at least ${Requirements.TEXT_MIN} characters`,
  AT_LEAST_TEXT_MAX_CHARS: `Must be ${Requirements.TEXT_MAX} characters or less`,
  AT_LEAST_PASSWORD_MIN_CHARS: `Must be at least ${Requirements.PASSWORD_MIN} characters`
}

const alertValidation = Yup.object({
  text: Yup.string().required(ErrorMessages.REQUIRED).strict(true),
  type: Yup.string().required(ErrorMessages.REQUIRED).strict(true),
  url: Yup.string(),
  urlCaption: Yup.string()
})

const challengeSchema = Yup.object({
  title: Yup.string().required(ErrorMessages.REQUIRED).strict(true),
  description: Yup.string().required(ErrorMessages.REQUIRED).strict(true),
  order: Yup.number()
    .required(ErrorMessages.REQUIRED)
    .typeError(ErrorMessages.NUMBERS_ONLY)
    .min(0, ErrorMessages.POSITIVE_NUMBERS_ONLY)
    .strict(true)
})

const lessonSchema = Yup.object({
  title: Yup.string().required(ErrorMessages.REQUIRED).strict(true),
  description: Yup.string().required(ErrorMessages.REQUIRED).strict(true),
  docUrl: Yup.string(),
  githubUrl: Yup.string(),
  videoUrl: Yup.string(),
  order: Yup.number()
    .required(ErrorMessages.REQUIRED)
    .typeError(ErrorMessages.NUMBERS_ONLY)
    .min(0, ErrorMessages.POSITIVE_NUMBERS_ONLY)
    .strict(true),
  slug: Yup.string().required(ErrorMessages.REQUIRED).strict(true),
  chatUrl: Yup.string()
})

const signupValidation = Yup.object({
  email: Yup.string()
    .email(ErrorMessages.INVALID_EMAIL)
    .required(ErrorMessages.REQUIRED),
  username: Yup.string()
    .strict(true)
    .lowercase(ErrorMessages.MUST_BE_LOWERCASE)
    .matches(Regex.REGEX_ALPHANUMERICS_AND_SPACE, ErrorMessages.ALPHA_NUM_CHARS)
    .min(Requirements.TEXT_MIN, ErrorMessages.AT_LEAST_TEXT_MIN_CHARS)
    .max(Requirements.TEXT_MAX, ErrorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .trim(ErrorMessages.LEADING_TRAILING)
    .required(ErrorMessages.REQUIRED),
  firstName: Yup.string()
    .strict(true)
    .matches(Regex.REGEX_ALPHANUMERICS_AND_SPACE, ErrorMessages.ALPHA_NUM_CHARS)
    .min(Requirements.TEXT_MIN, ErrorMessages.AT_LEAST_TEXT_MIN_CHARS)
    .max(Requirements.TEXT_MAX, ErrorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .trim(ErrorMessages.LEADING_TRAILING)
    .required(ErrorMessages.REQUIRED),
  lastName: Yup.string()
    .strict(true)
    .matches(Regex.REGEX_ALPHANUMERICS_AND_SPACE, ErrorMessages.ALPHA_NUM_CHARS)
    .min(Requirements.TEXT_MIN, ErrorMessages.AT_LEAST_TEXT_MIN_CHARS)
    .max(Requirements.TEXT_MAX, ErrorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .trim(ErrorMessages.LEADING_TRAILING)
    .required(ErrorMessages.REQUIRED),
  password: Yup.string()
    .min(Requirements.PASSWORD_MIN, ErrorMessages.AT_LEAST_PASSWORD_MIN_CHARS)
    .max(Requirements.TEXT_MAX, ErrorMessages.AT_LEAST_TEXT_MAX_CHARS)
})

const loginValidation = Yup.object({
  username: Yup.string()
    .strict(true)
    .lowercase(ErrorMessages.MUST_BE_LOWERCASE)
    .matches(Regex.REGEX_ALPHANUMERICS_AND_SPACE, ErrorMessages.ALPHA_NUM_CHARS)
    .min(Requirements.TEXT_MIN, ErrorMessages.AT_LEAST_TEXT_MIN_CHARS)
    .max(Requirements.TEXT_MAX, ErrorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .trim(ErrorMessages.LEADING_TRAILING)
    .required(ErrorMessages.REQUIRED),
  password: Yup.string()
    .min(Requirements.PASSWORD_MIN, ErrorMessages.AT_LEAST_PASSWORD_MIN_CHARS)
    .max(Requirements.TEXT_MAX, ErrorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .required(ErrorMessages.REQUIRED)
})

const passwordValidation = Yup.object({
  password: Yup.string()
    .min(Requirements.PASSWORD_MIN, ErrorMessages.AT_LEAST_PASSWORD_MIN_CHARS)
    .max(Requirements.TEXT_MAX, ErrorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .required(ErrorMessages.REQUIRED)
})

const confirmPasswordValidation = Yup.object({
  password: Yup.string()
    .min(Requirements.PASSWORD_MIN, ErrorMessages.AT_LEAST_PASSWORD_MIN_CHARS)
    .max(Requirements.TEXT_MAX, ErrorMessages.AT_LEAST_TEXT_MAX_CHARS)
    .required(ErrorMessages.REQUIRED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], ErrorMessages.PASSWORD_MUST_MATCH)
    .required(ErrorMessages.REQUIRED)
})

const resetPasswordValidation = Yup.object({
  userOrEmail: Yup.string()
    .min(Requirements.TEXT_MIN, ErrorMessages.AT_LEAST_TEXT_MIN_CHARS)
    .required(ErrorMessages.REQUIRED)
})

export {
  alertValidation,
  challengeSchema,
  lessonSchema,
  signupValidation,
  loginValidation,
  passwordValidation,
  confirmPasswordValidation,
  resetPasswordValidation
}
