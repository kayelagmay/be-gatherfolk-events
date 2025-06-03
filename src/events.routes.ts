import express, { Request, Response } from "express";
// import { getAllEvents } from "./controller";
import { getGoogleEvents } from "./controller";
import events from './data/events.json';

const router = express.Router();

// router.get("/eventsApi", getAllEvents);

// router.get('/eventsTest', (req: Request, res: Response) => {
//   res.json(events);
// });

router.get("/google-events", getGoogleEvents);

export default router;