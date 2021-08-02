/**
 * @jest-environment node
 */

import { getResetTemplate, getSignupTemplate } from './mailTemplate'
import { sendResetEmail, sendSignupEmail } from './mail'
import nodemailer from 'nodemailer'

describe('Mail templates', () => {
  const token = 'faketoken123'
  const matcher = new RegExp(`<a href=".+/confirm/${token}">`)

  test('Signup template contains link to set password', () => {
    const res = getSignupTemplate(token)
    expect(res.trim()).toMatch(matcher)
  })

  test('Reset template contains link to set password', () => {
    const res = getResetTemplate(token)
    expect(res.trim()).toMatch(matcher)
  })
})

describe('Mail works as expected', () => {
  const { sendMail: sendMailMock } = nodemailer.createTransport()

  test('It calls email client to send signup email', async () => {
    await sendSignupEmail('hello@c0d3.com', 'faketoken123')
    expect(sendMailMock).toBeCalledTimes(1)
    expect(sendMailMock).toBeCalledWith({
      from: '<hello@c0d3.com>',
      to: 'hello@c0d3.com',
      subject: 'Welcome to c0d3.com',
      html: getSignupTemplate('faketoken123')
    })
  })

  test('It calls email client to send reset password email', async () => {
    await sendResetEmail('hello@c0d3.com', 'faketoken123')
    expect(sendMailMock).toBeCalledTimes(1)
    expect(sendMailMock).toBeCalledWith({
      from: '<admin@c0d3.com>',
      to: 'hello@c0d3.com',
      subject: 'Forgot Password',
      html: getResetTemplate('faketoken123')
    })
  })
})
