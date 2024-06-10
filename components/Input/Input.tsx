import React from 'react'
import { ErrorMessage, useField, FieldInputProps } from 'formik'

type Props = {
  type?: string
  placeholder?: string
  classes?: string
} & FieldInputProps<any>

const Input: React.FC<Props> = ({ ...props }) => {
  const [field, { error, touched }] = useField(props)
  const hasErrorStyle = error && touched ? 'outline-danger' : ''
  const classes =
    props.classes ||
    `form-control form-control-lg fw-light mb-3 ${hasErrorStyle}`
  return (
    <>
      <input
        {...field}
        {...props}
        type={props.type}
        placeholder={props.placeholder}
        className={classes}
      />
      <ErrorMessage
        className="text-danger text-start ps-3 mt-n3"
        component="div"
        name={props.name}
      />
    </>
  )
}

export default Input
