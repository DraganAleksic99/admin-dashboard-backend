import { Router } from 'express'
import multer from 'multer'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProducts,
  getPhoto
} from '../controllers/productController'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router
  .route('/products')
  .get(getProducts)
  .post(upload.single('image'), createProduct)
  .delete(deleteProducts)

router.put('/products/:productId', upload.single('image'), updateProduct)
router.route('/product/image/:productId').get(getPhoto)

export default router
