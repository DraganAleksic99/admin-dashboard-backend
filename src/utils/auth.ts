import jwt from 'jsonwebtoken'
import config from '../config/config'

interface User {
  _id: string
  email: string
  exp?: string
}

interface JWTOptions {
  issuer?: string
  subject?: string
  audience?: string
  expiresIn?: string
}

const i = ''
const s = ''
const a = ''

const verifyOptions: JWTOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: '8784h'
}

const generateJWT = (payload: User) => {
  const signOptions: JWTOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: '8784h'
  }
  const options = signOptions

  if (payload && payload.exp) {
    delete options.expiresIn
  }

  return jwt.sign({ payload }, config.jwtSecret, options)
}

const verifyJWT = (payload: string) => {
  return jwt.verify(payload, config.jwtSecret, verifyOptions)
}

export { generateJWT, verifyJWT }
