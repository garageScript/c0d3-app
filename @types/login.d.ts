export type Values = {
  username: string
  password: string
}

export type Props = {
  submitLogin: (values: Values) => void
}
