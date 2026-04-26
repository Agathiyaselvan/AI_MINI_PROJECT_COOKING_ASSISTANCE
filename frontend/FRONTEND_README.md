# AI Recipe Assistant - React Frontend

Modern, responsive React frontend for the AI Recipe Assistant built with Vite.

## Features

- **Beautiful Dark Theme UI** - Modern gradient background and smooth animations
- **Real-time Chat Interface** - Interactive messaging with the recipe assistant
- **Suggested Queries** - Quick-start buttons for common recipe queries
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Loading States** - Smooth loading animations while waiting for responses
- **Message Timestamps** - Track when messages were sent
- **Error Handling** - Graceful error messages if the server is unavailable

## Tech Stack

- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with animations

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 3. Production Build

Build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### 4. Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Prerequisites

- Backend API running at `http://127.0.0.1:8000`
- Node.js 14+ installed

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── RecipeChat.jsx      # Main chat component
│   │   └── RecipeChat.css      # Component styles
│   ├── api/
│   │   └── apiClient.js        # Axios API client
│   ├── App.jsx                 # Root component
│   ├── App.css                 # App styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## API Integration

The frontend communicates with the FastAPI backend via the `/chat` endpoint:

```javascript
POST /chat
Body: { query: string }
Response: { answer: string }
```

The API client is configured in `src/api/apiClient.js`.

## Customization

### Styling

- Global colors are defined in `src/index.css` using CSS variables
- Component-specific styles are in `src/components/RecipeChat.css`
- To change colors, modify the CSS variables in `:root`

### Backend URL

To change the backend URL, update the `baseURL` in `src/api/apiClient.js`:

```javascript
const apiClient = axios.create({
  baseURL: 'http://your-backend-url:8000'
})
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, Vite will use the next available port. Check the console output.

### Backend Connection Error

Ensure the FastAPI backend is running at `http://127.0.0.1:8000`. Check the backend logs for issues.

### Module Not Found

If you get module errors, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Performance

- Optimized bundle size with tree-shaking
- Lazy loading of components
- CSS animations use GPU acceleration
- Smooth scrolling for better UX

## License

Part of the AI Recipe Assistant project
