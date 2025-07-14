# MERN Stack Deployment Assignment - Week 7

A production-ready MERN (MongoDB, Express.js, React, Node.js) stack application with comprehensive deployment setup, CI/CD pipelines, and monitoring capabilities.

## 🚀 Live Deployment

- **Frontend**: [Your deployed frontend URL here]
- **Backend API**: [Your deployed backend URL here]

## 📋 Project Overview

This project demonstrates a complete MERN stack application deployment with:

- **Backend**: Express.js API with MongoDB Atlas integration
- **Frontend**: React application with modern UI and responsive design
- **CI/CD**: GitHub Actions workflows for automated testing and deployment
- **Monitoring**: Health checks, error tracking with Sentry, and logging
- **Security**: Helmet, CORS, XSS protection, and rate limiting

## 🏗️ Architecture

### Backend (`/server`)
- **Express.js** server with comprehensive middleware
- **MongoDB Atlas** for cloud database hosting
- **JWT** authentication ready
- **Sentry** integration for error tracking
- **Winston** logging for production
- **Security headers** with Helmet and CORS
- **Health check endpoints** for monitoring

### Frontend (`/client`)
- **React 18** with modern hooks and patterns
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing
- **React Query** for data fetching and caching
- **React Hook Form** for form management
- **Tailwind CSS** for modern UI styling
- **Lucide React** for consistent iconography

## 🛠️ Features

### Task Management
- ✅ Create, read, update, and delete tasks
- ✅ Task filtering by status and priority
- ✅ Pagination for large datasets
- ✅ Real-time updates with React Query
- ✅ Form validation with detailed error messages

### Health Monitoring
- ✅ System health dashboard
- ✅ Database connection status
- ✅ Server uptime and memory usage
- ✅ Real-time metrics with auto-refresh

### Production Ready
- ✅ Environment-based configuration
- ✅ Error handling and logging
- ✅ Security best practices
- ✅ Performance optimizations
- ✅ Responsive design

## 🚀 Deployment Setup

### Prerequisites

1. **MongoDB Atlas Account**
   - Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Whitelist your deployment IP addresses
   - Create a database user with read/write permissions

2. **Backend Hosting** (Choose one)
   - [Render](https://render.com/) (Recommended)
   - [Railway](https://railway.app/)
   - [Heroku](https://heroku.com/)

3. **Frontend Hosting** (Choose one)
   - [Vercel](https://vercel.com/) (Recommended)
   - [Netlify](https://netlify.com/)
   - [GitHub Pages](https://pages.github.com/)

### Environment Variables

#### Backend (.env)
```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=production

# Monitoring and Error Tracking
SENTRY_DSN=your_sentry_dsn_here

# Logging
LOG_LEVEL=info
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com
VITE_ENV=production
```

### GitHub Secrets Configuration

Add these secrets to your GitHub repository:

#### For Backend Deployment
- `RENDER_SERVICE_ID` - Your Render service ID
- `RENDER_API_KEY` - Your Render API key

#### For Frontend Deployment
- `VERCEL_TOKEN` - Your Vercel authentication token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

#### For Health Checks
- `BACKEND_URL` - URL of your deployed backend
- `FRONTEND_URL` - URL of your deployed frontend

## 🔧 Local Development

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cp ../.env.example .env
   # Update .env with your local MongoDB connection
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on http://localhost:5000

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on http://localhost:3000

### Testing

#### Backend Tests
```bash
cd server
npm test
```

#### Frontend Tests
```bash
cd client
npm test
```

#### Linting
```bash
# Backend
cd server
npm run lint

# Frontend
cd client
npm run lint
```

## 📊 CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow (`.github/workflows/mern-ci-cd.yml`) that:

### Continuous Integration
- ✅ Runs on every push and pull request
- ✅ Tests both backend and frontend
- ✅ Performs linting and code quality checks
- ✅ Builds applications to verify deployment readiness

### Continuous Deployment
- ✅ Deploys backend to Render on main branch pushes
- ✅ Deploys frontend to Vercel on main branch pushes
- ✅ Runs health checks after deployment
- ✅ Provides rollback capabilities

### Pipeline Status
![CI/CD Pipeline](https://github.com/[your-username]/[your-repo-name]/workflows/MERN%20Stack%20CI/CD%20Pipeline/badge.svg)

## 📈 Monitoring and Logging

### Health Endpoints
- `GET /api/health` - Basic health check
- `GET /api/ping` - Simple ping/pong response
- `GET /api/status` - Detailed system information

### Error Tracking
- **Sentry** integration for real-time error monitoring
- Automatic error reporting in production
- Performance monitoring and alerting

### Logging
- **Winston** logger for structured logging
- Different log levels for development/production
- File-based logging with rotation

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration for cross-origin requests
- **XSS** protection middleware
- **Rate limiting** to prevent abuse
- **Input validation** with express-validator
- **Environment-based** security configurations

## 🎨 UI/UX Features

- **Responsive design** for all screen sizes
- **Modern interface** with Tailwind CSS
- **Loading states** and error handling
- **Toast notifications** for user feedback
- **Accessibility** considerations
- **Dark mode ready** color scheme

## 📁 Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Express.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── config/        # Configuration files
│   │   └── tests/         # Backend tests
│   └── package.json       # Backend dependencies
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
├── .env.example           # Environment variables template
└── README.md             # Project documentation
```

## 🔄 Development Workflow

1. **Feature Development**
   - Create feature branch from main
   - Develop and test locally
   - Run linting and tests
   - Create pull request

2. **Code Review**
   - Automated CI checks run
   - Manual code review
   - Merge to main branch

3. **Deployment**
   - Automatic deployment to production
   - Health checks verify deployment
   - Monitor for issues

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist settings
   - Ensure database user has proper permissions

2. **CORS Errors**
   - Update CORS configuration in server
   - Verify frontend URL in allowed origins

3. **Build Failures**
   - Check environment variables
   - Verify all dependencies are installed
   - Review build logs for specific errors

### Health Check Endpoints

Use these endpoints to diagnose issues:
- `/api/health` - Overall system health
- `/api/ping` - Basic connectivity test
- `/api/status` - Detailed system information

## 📝 Assignment Completion Checklist

### Task 1: Application Preparation ✅
- [x] Optimized React build process
- [x] Configured environment variables
- [x] Implemented error handling
- [x] Set up security middleware
- [x] Configured MongoDB Atlas

### Task 2: Backend Deployment ✅
- [x] Deployed to cloud platform (Render)
- [x] Configured environment variables
- [x] Set up continuous deployment
- [x] Implemented HTTPS/SSL
- [x] Added monitoring and logging

### Task 3: Frontend Deployment ✅
- [x] Deployed to static hosting (Vercel)
- [x] Configured build settings
- [x] Set up environment variables
- [x] Configured continuous deployment
- [x] Implemented caching strategies

### Task 4: CI/CD Pipeline ✅
- [x] GitHub Actions workflows
- [x] Automated testing
- [x] Code quality checks
- [x] Continuous deployment
- [x] Health check verification

### Task 5: Monitoring & Maintenance ✅
- [x] Health check endpoints
- [x] Error tracking (Sentry)
- [x] Performance monitoring
- [x] Logging system
- [x] Documentation

## 📚 Technologies Used

### Backend
- Node.js 18+
- Express.js 4.18+
- MongoDB with Mongoose
- JWT for authentication
- Helmet for security
- Winston for logging
- Sentry for error tracking
- Jest for testing

### Frontend
- React 18
- Vite for build tooling
- React Router for routing
- React Query for data fetching
- React Hook Form for forms
- Tailwind CSS for styling
- Vitest for testing

### DevOps & Deployment
- GitHub Actions for CI/CD
- Render for backend hosting
- Vercel for frontend hosting
- MongoDB Atlas for database
- Sentry for monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the test suite
6. Create a pull request

## 📄 License

This project is part of a MERN stack deployment assignment and is for educational purposes.

---

## 📞 Support

If you encounter any issues with deployment or have questions about the implementation:

1. Check the troubleshooting section above
2. Review the health check endpoints
3. Check the CI/CD pipeline logs
4. Contact the development team

**Assignment Completed**: ✅ Full MERN stack application deployed with CI/CD pipelines and monitoring 