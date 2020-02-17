export type Values = {
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
}

export type Props = {
  submitSignup: (values: Values) => void
}
