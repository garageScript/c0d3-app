import type { LoggedRequest } from '../../@types/helpers'

export const winstonDebug = async (
  _parent: void,
  arg: any,
  ctx: { req: LoggedRequest }
): Promise<any> => {
  const { req } = ctx
  try {
    const { msg } = arg
    console.log('normal log', msg)
    if (msg.includes('throw')) {
      throw new Error(msg)
    }
    return { msg }
  } catch (err: any) {
    req.info(err)
    req.warn(err)
    req.error(err)
    throw new Error(err)
  }
}
