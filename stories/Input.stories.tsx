import React from 'react'
import { action } from '@storybook/addon-actions'
import { Field, Form, Formik } from 'formik'
import Input from '../components/Input'

export default {
  component: Input,
  title: 'Input'
}

export const textInput: React.FC = () => {
  return (
    <Formik
      initialValues={{ text: 'Some text', textError: 'Wrong value' }}
      onSubmit={action('Submit value')}
      validate={() => ({ textError: 'Error message' })}
    >
      <Form>
        <Field name="text" placeholder="Your text" type="text" as={Input} />
        <Field
          name="textError"
          placeholder="Your text"
          type="text"
          as={Input}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  )
}

export const emailInput: React.FC = () => (
  <Formik
    initialValues={{
      email: 'email@domain.com',
      emailError: 'inv@lid^email@domain.con'
    }}
    onSubmit={action('Submit value')}
    validate={() => ({ emailError: 'Error message' })}
  >
    <Form>
      <Field name="email" placeholder="Email address" type="email" as={Input} />
      <Field
        name="emailError"
        placeholder="Email address"
        type="email"
        as={Input}
      />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </Form>
  </Formik>
)

export const passwordInput: React.FC = () => (
  <Formik
    initialValues={{
      password: 'password',
      passwordError: '123'
    }}
    onSubmit={action('Submit value')}
    validate={() => ({ passwordError: 'Error message' })}
  >
    <Form>
      <Field
        name="password"
        placeholder="Password"
        type="password"
        as={Input}
      />
      <Field
        name="passwordError"
        placeholder="Email address"
        type="password"
        as={Input}
      />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </Form>
  </Formik>
)
