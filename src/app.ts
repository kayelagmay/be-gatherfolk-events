import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import eventsRoutes from "./events.routes";

console.log("Loaded API Key:", process.env.EVENTBRITE_API_KEY);

const app = express();

app.use(cors());

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"]
}));

app.use("/api", eventsRoutes);

export default app;
