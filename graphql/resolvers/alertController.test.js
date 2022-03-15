/**
 * @jest-environment node
 */

jest.mock('./alerts')
import { alerts } from './alerts'
import prismaMock from '../../__tests__/utils/prismaMock'
import { addAlert, removeAlert } from './alertController'

const mockAlerts = ['excuse me sir', 'did u just', 'turn into a potato?']
const context = {
  req: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    session: {},
    user: { isAdmin: true }
  }
}

alerts.mockResolvedValue(mockAlerts)
prismaMock.alert.create.mockResolvedValue(mockAlerts[0])
prismaMock.alert.delete.mockResolvedValue(mockAlerts[0])

describe('Alert controller tests', () => {
  let ctx

  const newAlert = {
    text: 'Set up your computer to submit challenges.',
    type: 'info',
    url: 'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
    urlCaption: 'View Instructions'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ctx = { ...context }
  })

  test('Should add alert', async () => {
    expect(addAlert({}, newAlert, ctx)).resolves.toEqual(mockAlerts)
  })
  test('Should add alert with url and caption', async () => {
    expect(addAlert({}, newAlert, ctx)).resolves.toEqual(mockAlerts)
  })
  test('Should throw error if missing parameters', async () => {
    expect(
      addAlert({}, { url: 'https://google.com' }, ctx)
    ).rejects.toThrowError('Missing alert parameters')
  })

  test('Should remove alert', async () => {
    expect(removeAlert({}, { id: 5 }, ctx)).resolves.toEqual({ success: true })
  })
  test('Should throw error if no id provided when removing alert', async () => {
    prismaMock.alert.delete.mockRejectedValueOnce(new Error('Some Error')) // Actually is a prisma RecordNotFound Error
    expect(removeAlert({}, {}, ctx)).rejects.toThrowError()
  })
})
