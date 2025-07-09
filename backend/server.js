import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512"
    });
    res.json({ image: response.data[0].url });
  } catch (error) {
    console.error("שגיאה:", error.message);
    res.status(500).json({ error: "אירעה שגיאה ביצירת התמונה" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`שרת פועל על פורט ${PORT}`));
