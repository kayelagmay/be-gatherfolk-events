import { Request, Response } from 'express';
import axios from 'axios';

export const getGoogleEvents = async (req: Request, res: Response) => {
  const location = req.query.location || 'London';

  try {
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_events',
        q: `Theatre Events in ${location}`,
        api_key: process.env.SERPAPI_API_KEY,
      },
    });

    const events = response.data.events_results;
    res.status(200).json({ events });
  } catch (error) {
    console.error("SerpApi error:", error);
    res.status(500).json({ message: "Failed to fetch events from SerpApi" });
  }
};

