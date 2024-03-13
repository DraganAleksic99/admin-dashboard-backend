import { Document, Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

type Subscription = {
  name: string
  price: number
  currency: string
  proposalsLeft: number
  templatesLeft: number
  invitesLeft: number
  adsLeft: number
  hasAnalytics: boolean
  hasEmailAlerts: boolean
}

export type UserType = {
  _id: string
  email: string
  password: string
  country: string
  isPublic: boolean
  phone: string
  role: string
  state: string
  tier: string
  name: string
  avatar: string
  city: string
  canHire: boolean
  subscription?: Subscription
}

export interface IUser extends Document {
  name: string
  email: string
  password: string
  comparePassword: (enteredPassword: string) => boolean
  phone: string
  country?: string
  isPublic?: boolean
  role?: string
  state?: string
  tier?: string
  avatar?: string
  city?: string
  canHire?: boolean
  subscription?: Subscription
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  phone: {
    type: String,
    required: [true, 'phone is required']
  },
  country: String,
  isPublic: Boolean,
  role: String,
  state: String,
  tier: String,
  avatar: String,
  city: String,
  canHire: Boolean,
  subscription: {
    name: String,
    price: Number,
    currency: String,
    proposalsLeft: Number,
    templatesLeft: Number,
    invitesLeft: Number,
    adsLeft: Number,
    hasAnalytics: Boolean,
    hasEmailAlerts: Boolean
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
