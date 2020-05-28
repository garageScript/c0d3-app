import { encode, decode } from './encoding'

describe('Encoding and Decoding should work as expected', () => {
  it('Encode encodes object into base64', () => {
    const singleObj = {
      token: 'abc',
      userId: 1
    }

    const answer = Buffer.from(JSON.stringify(singleObj)).toString('base64')
    expect(encode(singleObj)).toEqual(answer)
  })
  it('Decode extracts information from base64', () => {
    const singleObj = {
      token: 'abc',
      userId: 1
    }

    const encStr = Buffer.from(JSON.stringify(singleObj)).toString('base64')
    const { token, userId } = decode(encStr)
    expect(token).toEqual('abc')
    expect(userId).toEqual(1)
  })
})
