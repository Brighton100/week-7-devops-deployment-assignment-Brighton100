# 🏋️‍♂️ Brighton Gym Management App

A full-stack MERN application for managing gym members with MongoDB Atlas integration.

## 🚀 Features

- **Member Management**: Add, view, and delete gym members
- **Membership Types**: Basic, Premium, and VIP memberships
- **Real-time Status**: Health check and database connection monitoring
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **Production Ready**: Configured for deployment on cloud platforms

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Deployment**: Render, Heroku, or Railway compatible

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### 1. Clone Repository
```bash
git clone https://github.com/Brighton100/Brighton-gym-app.git
cd Brighton-gym-app
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brighton-gym?retryWrites=true&w=majority
PORT=3000
NODE_ENV=production
```

### 4. MongoDB Atlas Setup
1. Create a MongoDB Atlas account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string and replace the placeholder in `.env`
5. Whitelist your IP address (0.0.0.0/0 for deployment)

## 🚀 Deployment Instructions

### Deploy to Render

1. **Connect Repository**
   - Go to [render.com](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build Command: `npm install`
   - Start Command: `node app.js`

3. **Set Environment Variables**
   - Add `MONGODB_URI` with your MongoDB Atlas connection string
   - Add `NODE_ENV=production`
   - Add `PORT=3000` (optional)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

### Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   # Install Heroku CLI
   npm install -g heroku
   
   # Login to Heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   heroku create brighton-gym-app
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-connection-string"
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploy to Railway

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Create new project from GitHub repo

2. **Set Environment Variables**
   - Add `MONGODB_URI`
   - Add `NODE_ENV=production`

3. **Deploy**
   - Railway will automatically build and deploy

## 🔧 Local Development

```bash
# Start backend server
npm run dev

# In another terminal, start frontend
cd client
npm run dev
```

The app will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/members` | Get all members |
| POST | `/api/members` | Create new member |
| PUT | `/api/members/:id` | Update member |
| DELETE | `/api/members/:id` | Delete member |

## 🐛 Troubleshooting

### MongoDB Connection Error
**Error**: `The uri parameter to openUri() must be a string, got "undefined"`

**Solution**: Ensure your `MONGODB_URI` environment variable is properly set:
1. Check your `.env` file has the correct MongoDB connection string
2. For deployment platforms, verify the environment variable is set in the dashboard
3. Make sure your MongoDB Atlas cluster is running and accessible

### Common Issues
- **Build Fails**: Run `npm install` to ensure all dependencies are installed
- **Cannot Connect to Database**: Verify MongoDB Atlas IP whitelist includes your deployment platform
- **Frontend Not Loading**: Ensure the build process completed successfully

## 📁 Project Structure

```
Brighton-gym-app/
├── app.js                 # Main server file
├── package.json           # Backend dependencies
├── .env.example          # Environment variables template
├── client/               # React frontend
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   └── ...
│   └── package.json      # Frontend dependencies
└── README.md             # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Brighton Mark Ochieng**
- GitHub: [@Brighton100](https://github.com/Brighton100)
