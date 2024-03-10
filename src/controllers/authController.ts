import { Request, Response } from 'express'
import User from '../models/User'
import { generateJWT } from '../utils/auth'

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email or password is missing' })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: 'The user already exists' })
    }

    const user = await User.create({ email, password })

    if (user) {
      return res.status(201).json({
        id: user._id,
        email: user.email
      })
    } else {
      return res.status(400).json({
        message: 'An error occured in creating the user'
      })
    }
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email or password is missing' })
  }

  const user = await User.findOne({ email }).exec()

  if (!user) {
    return res.status(400).json({ message: 'User with this email does not exist' })
  }

  if (!user.comparePassword(password)) {
    return res.status(400).json({ message: 'The password you provided is incorrect' })
  }

  //@ts-expect-error: dont store sensitive info in jwt
  delete user.password

  const token = generateJWT(user)

  return res.status(200).json({ user, token })
}

export { registerUser, loginUser }
