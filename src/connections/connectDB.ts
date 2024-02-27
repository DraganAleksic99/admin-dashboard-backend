import mongoose from 'mongoose'
import config from '../config/config'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err: any) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

export default connectDB
