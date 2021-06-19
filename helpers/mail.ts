import nodemailer from 'nodemailer'
import { getResetTemplate, getSignupTemplate } from './mailTemplate'

const SMTP_HOST = process.env.SMTP_HOST ?? ''
const SMTP_USER = process.env.SMTP_USER ?? ''
const SMTP_PASSWORD = process.env.SMTP_PASSWORD ?? ''

const transporter = nodemailer.createTransport({
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
  transporter.sendMail({
    from: '<hello@c0d3.com>',
    to: email,
    subject: 'Welcome to c0d3.com',
    html: getSignupTemplate(token)
  })

export const sendResetEmail = (email: string, token: string) =>
  transporter.sendMail({
    from: `<admin@c0d3.com>`,
    to: email,
    subject: 'Forgot Password',
    html: getResetTemplate(token)
  })
