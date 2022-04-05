import React from 'react'
import { render } from '@testing-library/react'
import User404, { getServerSideProps } from '../../../pages/discord/404user'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

jest.mock('../../../helpers/getUserSession')
import { getUserSession } from '../../../helpers/getUserSession'

const res = {
  setHeader: jest.fn(),
  json: jest.fn(),
  status: jest.fn()
}
const req = {}

describe('404User page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should redirect to /login on Login button click', async () => {
    expect.assertions(1)

    const { push } = useRouter()

    const { container } = render(<User404 />)

    const loginButton = container.querySelectorAll('button')[0]

    await userEvent.click(loginButton)
    expect(push).toBeCalledWith('/login')
  })

  it('Should redirect to /signup on Signup button click', async () => {
    expect.assertions(1)

    const { push } = useRouter()

    const { container } = render(<User404 />)

    const signupButton = container.querySelectorAll('button')[1]

    await userEvent.click(signupButton)
    expect(push).toBeCalledWith('/signup')
  })

  describe('getServerSideProps', () => {
    it('Should redirect to /curriculum if user logged in', async () => {
      expect.assertions(1)

      getUserSession.mockResolvedValue({ id: 1 })

      const value = await getServerSideProps({ req, res })

      expect(value).toStrictEqual({
        redirect: {
          permanent: false,
          destination: '/curriculum'
        }
      })
    })

    it('Should return empty props', async () => {
      expect.assertions(1)

      getUserSession.mockResolvedValue(null)

      const value = await getServerSideProps({ req, res })

      expect(value).toStrictEqual({ props: {} })
    })
  })
})
