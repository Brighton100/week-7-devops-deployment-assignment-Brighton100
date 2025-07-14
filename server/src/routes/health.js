const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    memory: process.memoryUsage()
  };

  res.status(200).json(healthCheck);
});

// Simple ping endpoint
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong', timestamp: new Date().toISOString() });
});

// Status endpoint with more detailed information
router.get('/status', (req, res) => {
  const status = {
    service: 'MERN Backend API',
    status: 'operational',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      host: mongoose.connection.host || 'unknown'
    },
    server: {
      uptime: process.uptime(),
      platform: process.platform,
      node_version: process.version
    }
  };

  res.status(200).json(status);
});

module.exports = router;