import { model, Schema } from 'mongoose'

export interface ISale {
  name: string
  data: number[]
}

const saleSchema = new Schema<ISale>({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  data: {
    type: [Number],
    required: [true, 'Data is required']
  }
})

export default model<ISale>('Sale', saleSchema)
