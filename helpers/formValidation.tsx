import * as Yup from 'yup'

const TEXT_MIN = 2
const TEXT_MAX = 20
const PASSWORD_MIN = 6
const REGEX_ALPHANUMERICS = /^[a-zA-Z0-9_]*$/

const signupValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  userName: Yup.string()
    .strict(true)
    .lowercase('Must be a lowercase string')
    .matches(REGEX_ALPHANUMERICS, 'Must be alphanumerics characters')
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .required('Required'),
  password: Yup.string()
    .min(PASSWORD_MIN, `Must be at least ${PASSWORD_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .required('Required'),
  firstName: Yup.string()
    .matches(REGEX_ALPHANUMERICS, 'Must be alphanumerics characters')
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .required('Required'),
  lastName: Yup.string()
    .matches(REGEX_ALPHANUMERICS, 'Must be alphanumerics characters')
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .required('Required')
})

export { signupValidation }
