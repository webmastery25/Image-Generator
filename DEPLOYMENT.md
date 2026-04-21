# AI Image Generator - Deployment Guide

## Quick Deploy to Vercel (Recommended - 3 minutes)

### Step 1: Create a GitHub Repository
```bash
# Create a new folder
mkdir ai-image-generator
cd ai-image-generator

# Initialize git
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Push to GitHub
1. Go to https://github.com/new
2. Create a new repository called `ai-image-generator`
3. Push your code:
```bash
git remote add origin https://github.com/YOUR-USERNAME/ai-image-generator.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to https://vercel.com/import
2. Import your GitHub repository
3. **Important**: Add Environment Variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your new OpenAI API key (the one you created after deleting the exposed one)
4. Click Deploy

### Step 4: Update Frontend
After deployment, you'll get a Vercel URL like: `https://your-app.vercel.app`

In `index.html`, update line ~156:
```javascript
const API_BASE_URL = 'https://your-app.vercel.app';
```

---

## Alternative: Deploy to Railway (Also Free)

1. Go to https://railway.app
2. Create new project → Deploy from GitHub
3. Add `OPENAI_API_KEY` environment variable
4. Get your URL and update in index.html

---

## Alternative: Deploy to Render (Also Free)

1. Go to https://render.com
2. Create new Web Service from GitHub
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variable `OPENAI_API_KEY`

---

## Local Development (Testing First)

### Install dependencies:
```bash
npm install
```

### Create `.env` file:
```
OPENAI_API_KEY=sk-proj-YOUR-NEW-KEY-HERE
```

### Run locally:
```bash
npm start
```

Visit http://localhost:3000

---

## File Structure
```
ai-image-generator/
├── server.js          # Backend API
├── index.html         # Frontend UI
├── package.json       # Dependencies
└── vercel.json        # Vercel config (auto-generated)
```

---

## Important Security Notes

✅ **DO:**
- Store API key as environment variable
- Never commit `.env` to git
- Regenerate API key after each leak
- Use CORS for frontend protection

❌ **DON'T:**
- Share API keys in code/chat
- Commit `.env` to GitHub
- Use API key in frontend code

---

## Troubleshooting

**"Cannot connect to API"**
- Make sure backend is deployed
- Check that OPENAI_API_KEY environment variable is set
- Verify the API_BASE_URL in index.html matches your deployment URL

**"API Error: Invalid API key"**
- Generate a NEW OpenAI API key (old one was exposed)
- Update the environment variable
- Redeploy

**"CORS Error"**
- Backend has CORS enabled
- Make sure you're calling the correct API URL

---

## Next Steps

1. Create new OpenAI API key (delete the exposed one first!)
2. Follow deployment steps above
3. Add key as environment variable during deployment
4. Test with sample prompts

Done! Your secure AI image generator is live! 🚀
