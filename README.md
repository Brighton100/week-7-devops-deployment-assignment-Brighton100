# Minimal MERN Stack App: Deployment & DevOps Assignment

## Overview
This repository contains a minimal MERN stack application scaffolded for deployment and DevOps practice. It includes:
- React frontend (`client/`)
- Express backend (`server/`)
- Example environment variable templates
- CI/CD pipeline with GitHub Actions
- Health check endpoint for monitoring

## Directory Structure
- `client/` – React app (frontend)
- `server/` – Express app (backend)
- `.github/workflows/` – GitHub Actions CI/CD pipeline
- `.env.example` files in both frontend and backend

## Local Development
### Backend
```
cd server
cp .env.example .env # Edit with your values
npm install
npm start
```

### Frontend
```
cd client
cp .env.example .env # Edit with your values
npm install
npm start
```

## Production Build
- Frontend: `npm run build` in `client/`
- Backend: Standard Express app, ready for deployment

## Health Check Endpoint
- **Backend:** `GET /api/health` returns `{ status: 'ok' }`

## Deployment
- **Backend:** Deploy to Render (or Railway/Heroku)
- **Frontend:** Deploy to Vercel (or Netlify/GitHub Pages)
- Configure environment variables on each platform
- Enable automatic deploys from GitHub main branch

## CI/CD Pipeline
- Located in `.github/workflows/mern-ci-cd.yml`
- Runs tests, lint, build, and deploys both frontend and backend
- Performs health checks after deployment

## Monitoring
- Health check endpoint for uptime monitoring
- Add your service (e.g., UptimeRobot) to monitor `/api/health`
- For advanced error/performance monitoring, integrate Sentry or similar

## Submission Checklist
- [x] Minimal MERN app scaffolded
- [x] CI/CD pipeline configured
- [x] Health check endpoint implemented
- [x] Example environment variable templates
- [ ] **Add deployed URLs below after deployment**
- [ ] **Add CI/CD pipeline screenshots below**

## Deployed URLs
- **Frontend:** [Add Vercel/Netlify URL here]
- **Backend:** [Add Render/Railway/Heroku URL here]

## CI/CD Pipeline Screenshots
_Add screenshots of your GitHub Actions runs here_

## Monitoring Setup
- Health check endpoint: `/api/health`
- Example: Add to UptimeRobot or similar for uptime monitoring

---
_This README was generated as part of the Week 7 Deployment and DevOps assignment._ 