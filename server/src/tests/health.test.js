const request = require('supertest');
const express = require('express');
const healthRoutes = require('../routes/health');

const app = express();
app.use('/api', healthRoutes);

describe('Health Routes', () => {
  describe('GET /api/health', () => {
    it('should return health check information', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);

      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
      expect(res.body).toHaveProperty('environment');
      expect(res.body).toHaveProperty('database');
      expect(res.body).toHaveProperty('memory');
    });
  });

  describe('GET /api/ping', () => {
    it('should return pong response', async () => {
      const res = await request(app)
        .get('/api/ping')
        .expect(200);

      expect(res.body).toHaveProperty('message', 'pong');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/status', () => {
    it('should return detailed status information', async () => {
      const res = await request(app)
        .get('/api/status')
        .expect(200);

      expect(res.body).toHaveProperty('service', 'MERN Backend API');
      expect(res.body).toHaveProperty('status', 'operational');
      expect(res.body).toHaveProperty('version', '1.0.0');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('database');
      expect(res.body).toHaveProperty('server');
    });
  });
});