# React Frontend Setup Guide

Your React frontend is now ready! Here's how to get it running:

## Quick Start

### 1. Install Dependencies

Open a terminal in the `frontend` folder and run:

```bash
cd frontend
npm install
```

This will install React, Vite, Axios, and all other dependencies.

### 2. Start Development Server

```bash
npm run dev
```

The app will automatically open at `http://localhost:3000`

### 3. Keep Backend Running

Make sure your FastAPI backend is still running in another terminal:

```bash
uvicorn main:app --reload
```

It should be at `http://127.0.0.1:8000`

## What's New

### Frontend Architecture
- ✅ **React 18** with hooks for state management
- ✅ **Vite** for fast development and building
- ✅ **Modern Component Structure** with proper separation of concerns
- ✅ **Responsive CSS** with dark theme matching your image
- ✅ **Axios API Client** for backend communication

### UI Features
- 👨‍🍳 Chef icon animation with greeting
- 💬 Real-time chat interface
- 🔗 Suggested recipe query buttons
- ✨ Smooth loading animations
- 📱 Fully responsive design
- 🎨 Beautiful gradient background
- ⌚ Message timestamps

### File Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── RecipeChat.jsx      # Main chat logic & UI
│   │   └── RecipeChat.css      # Component styles
│   ├── api/
│   │   └── apiClient.js        # API configuration
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # Main HTML file
├── package.json                # Dependencies
└── vite.config.js              # Vite settings
```

## Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

## Customization

All styling uses CSS variables in `src/index.css`. To change colors:

```css
:root {
  --accent: #e94560;        /* Main accent color */
  --primary: #1a1a2e;       /* Background color */
  --text-primary: #ffffff;  /* Text color */
  /* ... more colors ... */
}
```

## Troubleshooting

**Port 3000 already in use?**
- Vite will automatically use the next available port (3001, 3002, etc.)

**Backend connection error?**
- Verify backend is running at `http://127.0.0.1:8000`
- Check FAISS index exists (fix from earlier setup)

**Module not found errors?**
- Delete `node_modules` and run `npm install` again

## Next Steps

1. ✅ Run `npm install` in frontend folder
2. ✅ Run `npm run dev` to start development server
3. ✅ Open `http://localhost:3000` in your browser
4. ✅ Test with the suggested queries or try your own!

Enjoy your new React frontend! 🎉
