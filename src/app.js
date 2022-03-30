const express = require('express');
const cors = require('cors');
const passport = require('passport');
const AppError = require('./errors/appError');
const errorController = require('./errors/errorController');
//require('./auth/passportConfig');
require('./security/passwordDenyList');
const userRouter = require('./routes/userRoutes');

const app = express();

//set up middleware stack
app.use(cors());
app.use(express.json()); //json request body parser
app.use((req, res, next) => {
    console.log('request to: ' + req.originalUrl);
    console.log('method: ' + req.method);

    next();
});
//app.use(passport.initialize());
app.use('/api/users', userRouter);

//handle unhandled routes
app.all('*', (req, res, next) => {
    console.log(req.originalUrl);
    next(new AppError('not found', 404));
});

//set up global error handler
app.use(errorController.globalErrorHandler);

module.exports = app;
