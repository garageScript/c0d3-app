/**
 * @jest-environment node
 */

import prismaMock from '../../__tests__/utils/prismaMock'
import { alerts } from './alerts'

describe('Alerts resolver', () => {
  test('should return empty array if no alerts', () => {
    prismaMock.alert.findMany.mockResolvedValue([])
    return expect(alerts()).resolves.toEqual([])
  })

  test('should return list of alerts', () => {
    prismaMock.alert.findMany.mockResolvedValue([
      {
        id: 0,
        text: 'Set up your computer to submit challenges.',
        url: 'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
        urlCaption: 'View Instructions'
      },
      {
        id: 1,
        text: 'Please upgrade your CLI client by running npm update c0d3'
      }
    ])
    return expect(alerts()).resolves.toEqual([
      {
        id: 0,
        text: 'Set up your computer to submit challenges.',
        url: 'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
        urlCaption: 'View Instructions'
      },
      {
        id: 1,
        text: 'Please upgrade your CLI client by running npm update c0d3'
      }
    ])
  })
})
