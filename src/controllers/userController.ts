import { Request, Response } from 'express'
import User from '../models/User'

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(400).json({ message: 'Could not retrieve the user' })
    }

    res.status(200).json(user)
  } catch (e: any) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export { getUser }
