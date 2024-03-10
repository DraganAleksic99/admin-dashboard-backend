import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config/config'
import expressAsyncHandler from 'express-async-handler'
import { AuthenticationError } from './errorMiddleware'

const authenticate = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: string =
        req.headers['x-access-token'] || req.headers.authorization || req.body.token

      if (!token) {
        res.status(401)
        next(new AuthenticationError('No token provided'))
      }

      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)

        if (!token || token === '') {
          res.status(401)
          next(new AuthenticationError('No token provided'))
        }
      }

      const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload

      if (!decoded) {
        res.status(403)
        next(new AuthenticationError('Invalid signature'))
      }

      next()
    } catch (e: any) {
      res.status(401)
      next(new AuthenticationError('Invalid token'))
    }
  }
)

export { authenticate }
