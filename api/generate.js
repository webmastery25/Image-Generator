import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function handler(req, res) {
  const { prompt } = req.body

  try {
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    })

    res.status(200).json({
      imageUrl: result.data[0].url
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to generate image" })
  }
}
