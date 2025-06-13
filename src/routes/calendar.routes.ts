import express from "express";
import { generateIcs } from '../controllers/calendar.controller';

const router = express.Router();

router.get('/:eventId/download', generateIcs);

export default router;