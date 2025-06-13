import { Router } from "express";
import { ensureStaff } from '../middleware/auth';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/events.controllers';
import { signupForEvent } from '../controllers/signups.controller';

const router = Router();

router.get("/", getEvents);
router.post('/:id/signup', signupForEvent);

router.post('/', ensureStaff, createEvent);
router.put('/:id', ensureStaff, updateEvent);
router.delete('/:id', ensureStaff, deleteEvent);


export default router;
