import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    return res.status(200).json({
      imageUrl: result.data[0].url,
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);

    return res.status(500).json({
      error: err.message || "Internal server error",
    });
  }
}
