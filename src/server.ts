import Express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import config from './config/config'
import connectDB from './connections/connectDB'
import { errorHandler } from './middleware/errorMiddleware'
import authRouter from './routes/authRouter'
import productRouter from './routes/productRouter'
import saleRouter from './routes/saleRouter'
import eventRouter from './routes/eventRouter'
import { authenticate } from './middleware/authMiddleware'
import userRouter from './routes/userRouter'

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

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:3000', 'https://my-admin-dashboard-app.netlify.app']
      if (origin) {
        if (allowedOrigins.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    }
  })
)

app.use(authRouter)

app.use(authenticate)

app.use(productRouter)
app.use(saleRouter)
app.use(eventRouter)
app.use(userRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started and listening on port: ${PORT}`)
})
