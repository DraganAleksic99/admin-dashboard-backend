import { Request, Response } from 'express'
import Sale, { ISale } from '../models/Sale'

const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find()
    res.status(200).json(sales)
  } catch (e: any) {
    res.status(400).json({ message: 'Could not retrieve sales' })
  }
}

const createSale = async (req: Request, res: Response) => {
  const sale: ISale = req.body

  if (!sale) {
    return res.status(400).json({ message: 'Sale information missing' })
  }

  try {
    await Sale.create(sale)
    res.status(201).json({ message: 'Sale created' })
  } catch (e: any) {
    res.status(400).json({ message: 'Could not create sale' })
  }
}

export { getSales, createSale }
