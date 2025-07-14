const Task = require('../models/Task');
const { validationResult } = require('express-validator');
const logger = require('../config/logger');

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, completed, priority } = req.query;
    const filter = {};
    
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    if (priority) {
      filter.priority = priority;
    }

    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Task.countDocuments(filter);

    res.json({
      success: true,
      data: tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
  }
};

// Get single task
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    logger.error('Error fetching task:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching task',
      error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
  }
};

// Create new task
const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const task = new Task(req.body);
    const savedTask = await task.save();

    logger.info(`New task created: ${savedTask._id}`);
    
    res.status(201).json({
      success: true,
      data: savedTask,
      message: 'Task created successfully'
    });
  } catch (error) {
    logger.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    logger.info(`Task updated: ${task._id}`);

    res.json({
      success: true,
      data: task,
      message: 'Task updated successfully'
    });
  } catch (error) {
    logger.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    logger.info(`Task deleted: ${req.params.id}`);

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};