import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import process from "process";
import { Console } from "console";
const console = new Console(process.stdout, process.stderr);

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.post("/analyze", async (req, res) => {
  try {
    const { data } = req.body;

    // Validate data
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    // Simulate AI analysis (replace with actual OpenAI logic)
    const insights = `Received ${data.length} rows of data. Analysis complete.`;

    // Respond with insights
    res.status(200).json({ insights });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
