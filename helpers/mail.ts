import { getResetTemplate, getSignupTemplate } from './mailTemplate'
import { createTransport } from 'nodemailer'

const SMTP_HOST = process.env.SMTP_HOST ?? ''
const SMTP_USER = process.env.SMTP_USER ?? ''
const SMTP_PASSWORD = process.env.SMTP_PASSWORD ?? ''

const transporter = createTransport({
  pool: true,
  host: SMTP_HOST,
  port: 465,
  secure: true, // use TLS
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
})

export const sendSignupEmail = (email: string, token: string) =>
  transporter
    .sendMail({
      from: '<hello@c0d3.com>',
      to: email,
      subject: 'Welcome to c0d3.com',
      html: getSignupTemplate(token)
    })
    .then(metadata =>
      console.log(`Email sent succesfully\n`, JSON.stringify(metadata, null, 2))
    )
    .catch(error =>
      console.log(
        `Error while sending the email\n`,
        JSON.stringify(error, null, 2)
      )
    )

export const sendResetEmail = (email: string, token: string) =>
  transporter
    .sendMail({
      from: `<admin@c0d3.com>`,
      to: email,
      subject: 'Forgot Password',
      html: getResetTemplate(token)
    })
    .then(metadata =>
      console.log(`Email sent succesfully\n`, JSON.stringify(metadata, null, 2))
    )
    .catch(error =>
      console.log(
        `Error while sending the email\n`,
        JSON.stringify(error, null, 2)
      )
    )
