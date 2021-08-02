const nodemailer = jest.createMockFromModule('nodemailer')

nodemailer.createTransport = jest.fn().mockReturnValue({
  sendMail: jest.fn(() => Promise.resolve())
})

export default nodemailer
