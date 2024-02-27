import Express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import config from './config/config'
import connectDB from './connections/connectDB'
import { errorHandler } from './middleware/errorMiddleware'

interface UserInfo {
  _id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo | null
    }
  }
}

const PORT = config.port || 3500
const app = Express()

connectDB()

app.use(helmet)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started and listening on port: ${PORT}`)
})
