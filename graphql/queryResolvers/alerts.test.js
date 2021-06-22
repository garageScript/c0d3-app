/**
 * @jest-environment node
 */

import { alerts } from './alerts'
import { prisma } from '../../prisma'

describe('Alerts resolver', () => {
  test('should return empty array if no alerts', async () => {
    prisma.alert.findMany = jest.fn().mockReturnValue([])
    expect(alerts()).toEqual([])
  })

  test('should return list of alerts', async () => {
    prisma.alert.findMany = jest.fn().mockReturnValue([
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
    expect(alerts()).toEqual([
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
