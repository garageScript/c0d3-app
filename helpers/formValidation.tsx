import * as Yup from 'yup'

const TEXT_MIN = 2
const PASSWORD_MIN = 6
const REGEX_ALPHANUMERICS_AND_SPACE = /^[a-zA-Z0-9_\s]*$/

const signupValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  username: Yup.string()
    .strict(true)
    .lowercase('Must be a lowercase string')
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, 'Must be alphanumerics characters')
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .trim('Leading and trailing value must be alphanumeric character')
    .required('Required'),
  password: Yup.string()
    .min(PASSWORD_MIN, `Must be at least ${PASSWORD_MIN} characters`)
    .required('Required'),
  firstName: Yup.string()
    .strict(true)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, 'Must be alphanumerics characters')
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .trim('Leading and trailing value must be alphanumeric character')
    .required('Required'),
  lastName: Yup.string()
    .strict(true)
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, 'Must be alphanumerics characters')
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .trim('Leading and trailing value must be alphanumeric character')
    .required('Required')
})

const loginValidation = Yup.object({
  username: Yup.string()
    .strict(true)
    .lowercase('Must be a lowercase string')
    .matches(REGEX_ALPHANUMERICS_AND_SPACE, 'Must be alphanumerics characters')
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .trim('Leading and trailing value must be alphanumeric character')
    .required('Required'),
  password: Yup.string()
    .min(PASSWORD_MIN, `Must be at least ${PASSWORD_MIN} characters`)
    .required('Required')
})

export { signupValidation, loginValidation }
