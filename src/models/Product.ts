import { Schema, model } from 'mongoose'

export interface IProduct {
  name: string
  description?: string
  category: string
  price: number
  salePrice?: number
  quantity: number
  image?: {
    data: Buffer | null
    contentType: string
  }
  taxSettings: {
    includesTaxes?: boolean
    isTaxable?: boolean
  }
  productSku: string
  createdAt: Date
  updatedAt?: Date
  imageName?: string
  imageSize?: string
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  salePrice: Number,
  quantity: {
    type: Number,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  taxSettings: {
    includesTaxes: Boolean,
    isTaxable: Boolean
  },
  productSku: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: Date,
  imageName: String,
  imageSize: String
})

export default model<IProduct>('Product', productSchema)
