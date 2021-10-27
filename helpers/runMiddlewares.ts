import { NextApiResponse } from 'next'
import { LoggedRequest } from '../@types/helpers'
import { Request, Response } from 'express'

type Middlewares = Array<
  (
    req: LoggedRequest & Request,
    res: NextApiResponse & Response,
    next: () => void
  ) => void
>

// this function runs through each of the middlewares, one after another
// this function was created to eliminate the nested callbacks implementation linked below:
// https://github.com/garageScript/c0d3-app/pull/1158/commits/7293d722ad6440be4c2d2e636104c96cd009a2cf

export const runMiddlewares: (
  middlewaresArr: Middlewares,
  req: LoggedRequest & Request,
  res: NextApiResponse & Response,
  finalCallbackFn: () => void
) => any = (middlewaresArr, req, res, finalCallbackFn) => {
  if (!middlewaresArr.length) {
    return
  }
  const middleware = middlewaresArr.shift()
  return (
    middleware &&
    middleware(req, res, () => {
      middlewaresArr.length
        ? runMiddlewares(middlewaresArr, req, res, finalCallbackFn)
        : finalCallbackFn()
    })
  )
}

export default runMiddlewares
