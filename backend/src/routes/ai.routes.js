import { Router } from "express";
import OpenAI from "openai";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI GENERATE
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ message: "Prompt message not valid" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const aiText = response.choices[0].message.content;

    res.status(200).json({ text: aiText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
