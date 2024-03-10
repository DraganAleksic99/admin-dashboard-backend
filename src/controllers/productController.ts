import { Request, Response } from 'express'
import Product from '../models/Product'
import { IProduct } from '../models/Product'

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (e: any) {
    res.status(400).json({ message: 'Could not retrieve products' })
  }
}

const createProduct = async (req: Request, res: Response) => {
  let product: IProduct = req.body

  if (!product) {
    return res.status(400).json({ message: 'Product information missing' })
  }

  if (req.file) {
    product = {
      ...product,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    }
  }

  try {
    await Product.create(product)
    res.status(201).json({ message: 'Product created' })
  } catch (e: any) {
    res.status(400).json({ message: 'Could not create product' })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  const newProduct: IProduct = req.body
  const { productId } = req.params

  if (!newProduct) {
    return res.status(400).json({ message: 'Product information missing' })
  }

  try {
    const product = await Product.findById(productId).exec()

    if (!product) {
      return res.status(400).json({ message: 'Could not find product' })
    }

    const updatedProduct = {
      ...product.toObject(),
      ...newProduct,
      updatedAt: new Date()
    }

    if (req.file) {
      updatedProduct.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    }

    if (!newProduct.imageName) {
      if (updatedProduct.image?.data) updatedProduct.image.data = null
      updatedProduct.imageName = ''
      updatedProduct.imageSize = ''
    }

    await Product.updateOne({ _id: productId }, updatedProduct)

    res.status(201).json({ message: 'Product updated' })
  } catch (e: any) {
    res.status(400).json({ message: 'Could not update product' })
    console.log(e)
  }
}

const deleteProducts = async (req: Request, res: Response) => {
  const productsToDelete: string[] = req.body

  if (!productsToDelete) {
    return res.status(400).json({ message: 'Products information missing' })
  }

  try {
    const result = await Product.deleteMany({ _id: { $in: productsToDelete } })
    res.status(200).json({ message: `${result.deletedCount} product(s) were deleted` })
  } catch (e: any) {
    res.status(400).json({ message: 'Could not delete product(s)' })
  }
}

const getPhoto = async (req: Request, res: Response) => {
  const productId = req.params.productId

  try {
    const product = await Product.findById(productId, 'image').exec()

    if (!product) {
      return res.status(400).json({ message: 'Could not find product' })
    }

    if (product.image?.data) {
      res.set('Cross-Origin-Resource-Policy', 'false')
      res.set('Content-Type', product.image.contentType)
      res.send(product.image.data)
    }
  } catch (err) {
    res.status(500).json({ meessage: 'Something went wrong' })
  }
}

export { getProducts, createProduct, updateProduct, deleteProducts, getPhoto }
