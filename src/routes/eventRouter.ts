import { Router } from 'express'
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventCotroller'

const router = Router()

router.route('/events').get(getEvents).post(createEvent)
router.route('/events/:eventId').put(updateEvent).delete(deleteEvent)

export default router
