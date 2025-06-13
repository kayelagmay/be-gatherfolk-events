import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import eventsRoutes from "./routes/events.routes";
import calendarRoutes from "./routes/calendar.routes";
import authRoutes from './routes/auth.routes';

const app = express();

app.use((req, _res, next) => {
  next();
});

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://fe-gatherfolk-events.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api/events", eventsRoutes);    

app.use("/api/auth", authRoutes); 

app.use("/api/calendar", calendarRoutes);

export default app;