import express from "express";

const router = express.Router();

// In-memory events array (for MVP!)
let events: any[] = [
  {
    title: "Gatherfolk Community Event",
    date: "Thursday, 5 June 2025",
    venue: "London Community Centre",
    description: "Join us for our monthly community meetup! 🎉",
  },
];

// GET /api/events → return current events
router.get("/", (req, res) => {
  res.json(events);
});

// POST /api/events → add new event
router.post("/", (req, res) => {
  const { title, date, venue, description } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newEvent = { title, date, venue, description };
  events.push(newEvent);

  console.log("✅ New event added:", newEvent);

  return res.status(201).json({ message: "Event added", event: newEvent });
});

export default router;
