import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, style, size } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Map sizes to DALL-E 3 compatible sizes
    const sizeMap = {
      '1:1': '1024x1024',
      '16:9': '1792x1024',
      '9:16': '1024x1792'
    };

    const imageSize = sizeMap[size] || '1024x1024';
    const fullPrompt = `${prompt}. Style: ${style}. Professional quality, high detail.`;

    console.log(`Generating image: ${fullPrompt}`);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: fullPrompt,
      n: 1,
      size: imageSize,
      quality: 'hd',
      style: 'vivid',
    });

    const imageUrl = response.data[0].url;

    res.json({
      success: true,
      imageUrl: imageUrl,
      prompt: prompt,
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({
      error: error.message || 'Image generation failed',
      details: error.error?.message,
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
