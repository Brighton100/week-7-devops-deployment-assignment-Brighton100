const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const router = express.Router();

// Validation middleware for creating tasks
const createTaskValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters')
    .trim(),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
    .trim(),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
];

// Validation middleware for updating tasks
const updateTaskValidation = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters')
    .trim(),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
    .trim(),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
];

// Routes
router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTaskValidation, createTask);
router.put('/:id', updateTaskValidation, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;