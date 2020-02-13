import React from 'react'
import { ErrorMessage, Field, useField } from 'formik'

type Props = {
  name: string
  type?: string
  placeholder?: string
  classes?: string
}

const Input: React.FC<Props> = ({ children, ...props }) => {
  const [field, { error, touched }] = useField('')
  console.log('TCL: field', field)
  // @ts-ignore
  const errorStyle = error[props.name] && touched ? 'outline-danger' : ''
  const classes =
    props.classes ||
    `form-control form-control-lg font-weight-light mb-3 ${errorStyle}`
  return (
    <>
      <Field
        autoComplete="on"
        className={classes}
        placeholder={props.placeholder}
        type={props.type || 'text'}
        id={props.name}
        // {...field}
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
