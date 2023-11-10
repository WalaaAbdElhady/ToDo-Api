const express = require('express');
const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

// Middleware
app.use(express.static(`${__dirname}/public`));

app.use(express.json());

// root route
//This is called mounting the router  =>  So mounting a new router (taskRouter) on a route ('/api/v1/tasks').
app.use('/api/v1/tasks', taskRouter); //we created basically a sub application,
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
