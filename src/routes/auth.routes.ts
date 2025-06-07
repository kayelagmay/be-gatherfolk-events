import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

// Step 1: Redirect user to Google OAuth URL
router.get("/google/callback", async (req: Request, res: Response) => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    access_type: "offline", // important to get refresh token!
    response_type: "code",
    prompt: "consent", // force refresh token every time (good for dev)
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "profile",
      "email"
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  res.redirect(`${rootUrl}?${qs.toString()}`);
});

// Step 2: Handle Google callback with code → exchange for tokens
router.get("/google/callback", async (req, res) => {
    try {
        const code = req.query.code as string;
    
        if (!code) {
          return res.status(400).send("No code in the callback");
        }
    
        const tokenResponse = await axios.post(
            "https://oauth2.googleapis.com/token",
            {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
                grant_type: "authorization_code",
            },
            {
                headers: {
                "Content-Type": "application/json",
                },
            }
        );

        const { access_token, refresh_token, id_token } = tokenResponse.data;

        // Save tokens in your database here (for now console log)
        console.log("Access Token:", access_token);
        console.log("Refresh Token:", refresh_token);
        console.log("ID Token:", id_token); // contains user info

        // For now, redirect back to frontend
    return res.redirect(`${process.env.FRONTEND_URL}/calendar-success?access_token=${access_token}`);

  } 
    catch (error) {
    console.error("Failed to exchange code for tokens", error);
    return res.status(500).send("Authentication failed");
  }
});


export default router;