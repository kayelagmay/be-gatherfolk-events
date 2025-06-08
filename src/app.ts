import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';

import eventsRoutes from './routes/events.routes';
import authRoutes from './routes/auth.routes';
import calendarRoutes from './routes/calendar.routes';
import manageEventsRoutes from './routes/events.manage.routes';

console.log("Loaded API Key:", process.env.SERPAPI_API_KEY);

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://fe-gatherfolk-events.vercel.app",
  ],
  credentials: true,
}));

app.use("/api", eventsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/manage-events", manageEventsRoutes);

export default app;
