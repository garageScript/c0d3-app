import * as Yup from 'yup'

enum Constants {
  Required = 'Required',
  TextMin = 2,
  TextMax = 64,
  PasswordMin = 6,
  LeadingTrailing = 'Leading and trailing value must be alphanumeric character',
  NumbersOnly = 'Numbers only',
  PositiveNumbers = 'Positive numbers only',
  AlphaNumChars = 'Must be alphanumerics characters',
  MustBeLowercase = 'Must be a lowercase string'
}

const REGEX_ALPHANUMERICS_AND_SPACE = /^[a-zA-Z0-9_\s]*$/
const MustAtLeastTextMinChars = `Must be at least ${Constants.TextMin} characters`
const MustAtLeastTextMaxChars = `Must be ${Constants.TextMax} characters or less`
const MustAtLeastPassChars = `Must be at least ${Constants.PasswordMin} characters`

const alertValidation = Yup.object({
  text: Yup.string().required(Constants.Required).strict(true),
  type: Yup.string().required(Constants.Required).strict(true),
  url: Yup.string(),
  urlCaption: Yup.string()
})

const challengeSchema = Yup.object({
  title: Yup.string().required(Constants.Required).strict(true),
  description: Yup.string().required(Constants.Required).strict(true),
  order: Yup.number()
    .required(Constants.Required)
    .typeError(Constants.NumbersOnly)
    .min(0, Constants.PositiveNumbers)
    .strict(true)
})

const lessonSchema = Yup.object({
  title: Yup.string().required(Constants.Required).strict(true),
  description: Yup.string().required(Constants.Required).strict(true),
  docUrl: Yup.string(),
  githubUrl: Yup.string(),
  videoUrl: Yup.string(),
  order: Yup.number()
    .required(Constants.Required)
    .typeError(Constants.NumbersOnly)
    .min(0, Constants.PositiveNumbers)
    .strict(true),
  slug: Yup.string().required(Constants.Required).strict(true),
  chatUrl: Yup.string()
})

const signupValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required(Constants.Required),
  username: Yup.string()
    .strict(true)
    .lowercase(Constants.MustBeLowercase)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, Constants.AlphaNumChars)
    .min(Constants.TextMin, MustAtLeastTextMinChars)
    .max(Constants.TextMax, MustAtLeastTextMaxChars)
    .trim(Constants.LeadingTrailing)
    .required(Constants.Required),
  firstName: Yup.string()
    .strict(true)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, Constants.AlphaNumChars)
    .min(Constants.TextMin, MustAtLeastTextMinChars)
    .max(Constants.TextMax, MustAtLeastTextMaxChars)
    .trim(Constants.LeadingTrailing)
    .required(Constants.Required),
  lastName: Yup.string()
    .strict(true)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, Constants.AlphaNumChars)
    .min(Constants.TextMin, MustAtLeastTextMinChars)
    .max(Constants.TextMax, MustAtLeastTextMaxChars)
    .trim(Constants.LeadingTrailing)
    .required(Constants.Required),
  password: Yup.string()
    .min(Constants.PasswordMin, MustAtLeastPassChars)
    .max(Constants.TextMax, MustAtLeastTextMaxChars)
})

const loginValidation = Yup.object({
  username: Yup.string()
    .strict(true)
    .lowercase(Constants.MustBeLowercase)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, Constants.AlphaNumChars)
    .min(Constants.TextMin, MustAtLeastTextMinChars)
    .max(Constants.TextMax, MustAtLeastTextMaxChars)
    .trim(Constants.LeadingTrailing)
    .required(Constants.Required),
  password: Yup.string()
    .min(Constants.PasswordMin, MustAtLeastPassChars)
    .max(Constants.TextMax, MustAtLeastTextMaxChars)
    .required(Constants.Required)
})

const passwordValidation = Yup.object({
  password: Yup.string()
    .min(Constants.PasswordMin, MustAtLeastPassChars)
    .max(Constants.TextMax, MustAtLeastTextMaxChars)
    .required(Constants.Required)
})

const confirmPasswordValidation = Yup.object({
  password: Yup.string()
    .min(Constants.PasswordMin, MustAtLeastPassChars)
    .max(Constants.TextMax, MustAtLeastTextMaxChars)
    .required(Constants.Required),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Password must match')
    .required(Constants.Required)
})

const resetPasswordValidation = Yup.object({
  userOrEmail: Yup.string()
    .min(Constants.TextMin, MustAtLeastTextMinChars)
    .required(Constants.Required)
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
