import { Request, Response } from 'express'
import User from '../models/User'

const getUser = async (req: Request, res: Response) => {
  const userId = req.user?._id
  const user = await User.findById(userId, 'email')

  if (!user) {
    return res.status(400).json({ message: 'Could not retrieve the user' })
  }

  res.status(200).json(user)
}

export { getUser }
