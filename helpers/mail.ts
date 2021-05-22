import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses'
import { getResetTemplate, getSignupTemplate } from './mailTemplate'

const SES_KEY_ID = process.env.SES_KEY_ID ?? ''
const SES_SECRET_KEY = process.env.SES_SECRET_KEY ?? ''

// configure AWS SDK
export const sesClient = new SESClient({
  region: 'us-east-2',
  credentials: {
    accessKeyId: SES_KEY_ID,
    secretAccessKey: SES_SECRET_KEY
  }
})

interface sendMailArgs {
  from: string
  to: string
  subject: string
  html: string
}

export const mailParams = ({ from, to, subject, html }: sendMailArgs) =>
  new SendEmailCommand({
    Source: from,
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: html
        }
      }
    }
  })

export const sendSignupEmail = (email: string, token: string) =>
  sesClient.send(
    mailParams({
      from: '<hello@c0d3.com>',
      to: email,
      subject: 'Welcome to c0d3.com',
      html: getSignupTemplate(token)
    })
  )

export const sendResetEmail = (email: string, token: string) =>
  sesClient.send(
    mailParams({
      from: `<admin@c0d3.com>`,
      to: email,
      subject: 'Forgot Password',
      html: getResetTemplate(token)
    })
  )
