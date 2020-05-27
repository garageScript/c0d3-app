export const encode = (payload: any) => {
  const payloadString = JSON.stringify(payload)
  const encodedString = Buffer.from(payloadString).toString('base64')
  return encodedString
}

export const decode = (payload: any) => {
  const buff = Buffer.from(payload, 'base64')
  const decodedString = buff.toString('ascii')
  return JSON.parse(decodedString)
}
