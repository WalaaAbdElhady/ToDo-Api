const Task = require('../models/taskModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllTasks = catchAsync(async (req, res, next) => {
  // Get all tasks for a specific user
  const tasks = await Task.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    data: {
      tasks
    }
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  // Get a specific task for a specific user
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!task) {
    return next(
      new AppError('No task found with that ID for the specified user', 404)
    );
  }

  res.status(200).json({ task });
});

exports.createTask = catchAsync(async (req, res, next) => {
  // Set the user ID for the new task
  req.body.user = req.user.id;

  const newTask = await Task.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      task: newTask
    }
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!task) {
    return next(
      new AppError('No task found with that ID for the specified user', 404)
    );
  }

  res.status(200).json({ task });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  if (!task) {
    return next(
      new AppError('No task found with that ID for the specified user', 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
