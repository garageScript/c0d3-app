// aws-sdk needs to be imported like this as it does not have a default export
import * as aws from '@aws-sdk/client-ses'
import nodemailer from 'nodemailer'
import { getResetTemplate, getSignupTemplate } from './mailTemplate'

// configure AWS SDK
const ses = new aws.SES({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.SES_KEY_ID ?? '',
    secretAccessKey: process.env.SES_SECRET_KEY ?? ''
  }
})

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: { ses, aws }
})

export const sendSignupEmail = async (email: string, token: string) => {
  try {
    await transporter.sendMail({
      from: '<hello@c0d3.com>',
      to: email,
      subject: 'Welcome to c0d3.com',
      html: getSignupTemplate(token)
    })
  } catch (error) {
    throw new Error(`Error while sending signup email\n${error}`)
  }
}

export const sendResetEmail = async (email: string, token: string) => {
  try {
    await transporter.sendMail({
      from: `<admin@c0d3.com>`,
      to: email,
      subject: 'Forgot Password',
      html: getResetTemplate(token)
    })
  } catch (error) {
    throw new Error(`Error while sending password reset email\n${error}`)
  }
}
