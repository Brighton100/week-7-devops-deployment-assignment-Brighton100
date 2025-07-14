const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Task = require('../models/Task');

describe('Task API', () => {
  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      await Task.create([
        { title: 'Task 1', description: 'Description 1' },
        { title: 'Task 2', description: 'Description 2', completed: true },
        { title: 'Task 3', description: 'Description 3', priority: 'high' }
      ]);
    });

    it('should get all tasks', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(3);
      expect(res.body.pagination).toBeDefined();
    });

    it('should filter tasks by completed status', async () => {
      const res = await request(app)
        .get('/api/tasks?completed=true')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].completed).toBe(true);
    });

    it('should filter tasks by priority', async () => {
      const res = await request(app)
        .get('/api/tasks?priority=high')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].priority).toBe('high');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'New Task',
        description: 'New task description',
        priority: 'medium'
      };

      const res = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(taskData.title);
      expect(res.body.data.description).toBe(taskData.description);
      expect(res.body.data.priority).toBe(taskData.priority);
      expect(res.body.data.completed).toBe(false);
    });

    it('should not create task without title', async () => {
      const taskData = {
        description: 'Task without title'
      };

      const res = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Validation errors');
    });

    it('should not create task with invalid priority', async () => {
      const taskData = {
        title: 'Task with invalid priority',
        priority: 'invalid'
      };

      const res = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const task = await Task.create({
        title: 'Test Task',
        description: 'Test Description'
      });
      taskId = task._id;
    });

    it('should get a single task', async () => {
      const res = await request(app)
        .get(`/api/tasks/${taskId}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Task');
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const res = await request(app)
        .get(`/api/tasks/${fakeId}`)
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Task not found');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const task = await Task.create({
        title: 'Original Task',
        description: 'Original Description'
      });
      taskId = task._id;
    });

    it('should update a task', async () => {
      const updateData = {
        title: 'Updated Task',
        completed: true
      };

      const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send(updateData)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Updated Task');
      expect(res.body.data.completed).toBe(true);
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const res = await request(app)
        .put(`/api/tasks/${fakeId}`)
        .send({ title: 'Updated' })
        .expect(404);

      expect(res.body.success).toBe(false);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const task = await Task.create({
        title: 'Task to Delete',
        description: 'Will be deleted'
      });
      taskId = task._id;
    });

    it('should delete a task', async () => {
      const res = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Task deleted successfully');

      // Verify task is deleted
      const deletedTask = await Task.findById(taskId);
      expect(deletedTask).toBeNull();
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const res = await request(app)
        .delete(`/api/tasks/${fakeId}`)
        .expect(404);

      expect(res.body.success).toBe(false);
    });
  });
});