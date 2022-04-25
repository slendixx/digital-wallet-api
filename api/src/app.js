const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const AppError = require('./errors/appError');
const errorController = require('./errors/errorController');
require('./auth/passportConfig');
require('./security/passwordDenyList');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

//set up middleware stack
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3001',
    })
);
app.use(express.json()); //json request body parser
app.use(cookieParser(process.env.JWT_SECRET));
app.use((req, res, next) => {
    console.log(req.signedCookies);
    console.log('request to: ' + req.originalUrl);
    console.log('method: ' + req.method);

    next();
});
app.use(passport.initialize());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

//handle unhandled routes
app.all('*', (req, res, next) => {
    console.log(req.originalUrl);
    next(new AppError('request url not found', 404));
});

//set up global error handler
app.use(errorController.globalErrorHandler);

module.exports = app;
