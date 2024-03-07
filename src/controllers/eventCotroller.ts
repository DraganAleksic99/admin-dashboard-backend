import { Request, Response } from 'express'
import Event, { IEvent } from '../models/Event'

const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find()
    res.status(200).json(events)
  } catch (e: any) {
    res.status(400).json({ message: 'Could not retrieve events' })
  }
}

const createEvent = async (req: Request, res: Response) => {
  const event: IEvent = req.body

  if (!event) {
    return res.status(400).json({ message: 'Event information missing' })
  }

  try {
    const result = await Event.create(event)
    res.status(201).json({ message: 'Event created', event: result })
  } catch (e: any) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const updateEvent = async (req: Request, res: Response) => {
  const newEvent: IEvent = req.body
  const { eventId } = req.params

  if (!eventId || !newEvent) {
    return res.status(400).json({ message: 'Event ID or event information missing' })
  }

  try {
    const result = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

    if (!result) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.status(200).json({ message: 'Event updated', event: result })
  } catch (e: any) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params

  try {
    const result = await Event.deleteOne({ _id: eventId })

    if (result.acknowledged === false) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.status(200).json({ message: 'Event deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export { getEvents, createEvent, updateEvent, deleteEvent }
