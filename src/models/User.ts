import { Document, Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  email: string
  password: string
  comparePassword: (enteredPassword: string) => boolean
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required']
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (enteredPassword: string | undefined) {
  if (!enteredPassword) return false
  return await bcrypt.compare(enteredPassword, this.password)
}

export default model<IUser>('User', userSchema)
