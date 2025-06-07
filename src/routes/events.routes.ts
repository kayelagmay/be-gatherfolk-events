import express from "express";
import { getGoogleEvents } from "../controller";

const router = express.Router();

router.get("/google-events", getGoogleEvents);

export default router;