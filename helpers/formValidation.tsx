import * as Yup from 'yup'

const TEXT_MIN = 2
const TEXT_MAX = 20
const PASSWORD_MIN = 6

const signupValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  userName: Yup.string()
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .required('Required'),
  password: Yup.string()
    .min(PASSWORD_MIN, `Must be at least ${PASSWORD_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .required('Required'),
  firstName: Yup.string()
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .required('Required'),
  lastName: Yup.string()
    .min(TEXT_MIN, `Must be at least ${TEXT_MIN} characters`)
    .max(TEXT_MAX, `Must be ${TEXT_MAX} characters or less`)
    .required('Required')
})

export { signupValidation }
