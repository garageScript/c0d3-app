import React from 'react'
import { ErrorMessage, useField, FieldHookConfig } from 'formik'

type Props = {
  type?: string
  placeholder?: string
  classes?: string
} & FieldHookConfig<any>

const Input: React.FC<Props> = ({ ...props }) => {
  const [field, { error, touched }] = useField(props)
  const hasErrorStyle = error && touched ? 'outline-danger' : ''
  const classes =
    props.classes ||
    `form-control form-control-lg font-weight-light mb-3 ${hasErrorStyle}`
  return (
    <>
      <input
        {...field}
        type={props.type}
        placeholder={props.placeholder}
        className={classes}
      />
      <ErrorMessage
        className="text-danger text-left pl-3 mt-n3"
        component="div"
        name={props.name}
      />
    </>
  )
}

export default Input
