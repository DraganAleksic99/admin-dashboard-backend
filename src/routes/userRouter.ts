import { Router } from 'express'
import { getUser } from '../controllers/userController'

const router = Router()

router.get('/users/:userId', getUser)

export default router
