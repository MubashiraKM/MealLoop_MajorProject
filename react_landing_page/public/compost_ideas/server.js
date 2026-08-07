import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// POST endpoint to get compost ideas
app.post("/compost-ideas", async (req, res) => {
  const { item } = req.body;
  if (!item) return res.status(400).json({ error: "No item provided" });

  try {
    const prompt = `
You are a helpful composting assistant. 
Give **detailed, practical, step-by-step advice** for composting "${item}". 
Include method name, 2–4 simple steps, and 1 tip. 
Avoid long paragraphs. Keep it easy to read and actionable for beginners.`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GEMINI_API_KEY, // your key stored in .env
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    res.json(data); // send the Gemini response to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching compost ideas" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
