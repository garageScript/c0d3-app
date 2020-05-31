jest.mock('../dbload')
jest.mock('../mattermost')
import db from '../dbload'
import { addAlert, removeAlert } from './alertController'

describe('Alert controller tests', () => {
  const ctx = { req: { info: jest.fn(), session: {} } }
  test('Add alert', async () => {
    db.User.create = jest.fn()
    expect(
      addAlert(
        {},
        {
          text: 'Set up your computer to submit challenges.',
          type: 'info',
          url:
            'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
          urlCaption: 'View Instructions'
        },
        ctx
      )
    ).resolves.toEqual({ success: true })
  })
  test('Add alert with url and caption', async () => {
    db.User.create = jest.fn()
    expect(
      addAlert(
        {},
        {
          text: 'Set up your computer to submit challenges.',
          type: 'info',
          url:
            'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
          urlCaption: 'View Instructions'
        },
        ctx
      )
    ).resolves.toEqual({ success: true })
  })
  test('Add alert - throw error if missing parameters', async () => {
    db.User.create = jest.fn()
    expect(
      addAlert({}, { url: 'https://google.com' }, ctx)
    ).rejects.toThrowError('Missing alert parameters')
  })

  test('Remove alert', async () => {
    db.User.destroy = jest.fn()
    expect(removeAlert({}, { id: 5 }, ctx)).rejects.toThrowError(
      'User does not exist'
    )
  })
  test('Remove alert - throw error if no id provided', async () => {
    db.Alert.destroy = jest.fn().mockRejectedValueOnce('No alert id provided')
    expect(removeAlert({}, {}, ctx)).rejects.toThrowError(
      'No alert id provided'
    )
  })
})
