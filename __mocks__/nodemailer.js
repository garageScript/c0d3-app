const sendMail = jest.fn()

const nodemailer = {
  createTransport: () => ({ sendMail })
}

export default nodemailer
