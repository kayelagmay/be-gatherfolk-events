import express from "express";
import axios, { AxiosError } from "axios";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { accessToken, eventDetails } = req.body;

  if (!accessToken || !eventDetails) {
    return res.status(400).json({ message: "Missing accessToken or eventDetails" });
  }

  try {
    const response = await axios.post(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      eventDetails,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Calendar Event Created:", response.data);
    return res.status(200).json({
      message: "Event created successfully!",
      event: response.data,
    });
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error("❌ Failed to create calendar event:");
    console.error("Response data:", axiosError.response?.data);
    console.error("Status:", axiosError.response?.status);
    console.error("Message:", axiosError.message);

    return res.status(500).json({ message: "Failed to create event" });
  }
});

export default router;