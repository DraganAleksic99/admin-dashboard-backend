import { Router } from 'express'
import { getSales, createSale } from '../controllers/saleController'

const router = Router()

router.route('/sales').get(getSales).post(createSale)

export default router
