import { model, Schema } from 'mongoose'

export interface IEvent {
  title: string
  description?: string
  allDay?: boolean
  start: Date
  end: Date
}

const eventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: String,
  allDay: Boolean,
  start: {
    type: Date,
    required: [true, 'Start date is required']
  },
  end: {
    type: Date,
    required: [true, 'End date is required']
  }
})

export default model<IEvent>('Event', eventSchema)
