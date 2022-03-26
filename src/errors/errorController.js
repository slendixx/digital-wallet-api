import AppError from './appError';

export const handleUncaughtException = (error) => {
    console.error('*** Unhandled exception ***');
    console.log(error);

    process.exit(1);
};

export const handleUnhandledRejection = (server) => {
    // use the closure to be able to user server object inside the returned function
    return (error) => {
        console.error('*** Unhandled Rejection ***');
        console.log(error);

        server.close(() => {
            process.exit(1);
        });
    };
};

export const handleUnhandledRoutes = (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
};

const sendErrorDev = (error, res) => {
    // console.log(error);
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error,
    });
};

const handleDuplicateField = (error) => {
    if (error?.message.includes('usuario.email')) {
        error.message = 'the specified email is already in use';
    }
    return error;
};

const sendErrorProd = (error, res) => {
    if (error.isOperational) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
    console.log('UNKNOWN ERROR:', error);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
    });
};

export const globalErrorHandler = (error, req, res, next) => {
    console.log('*** Global Error Handler ***');
    // console.log({ NODE_ENV: process.env.NODE_ENV });
    console.log(error.stack);

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'dev') return sendErrorDev(error, res);
    if (error.message.includes('ER_DUP_ENTRY')) {
        error.isOperational = true;
        handleDuplicateField(error);
        //error.isOperational = true;
    }
    return sendErrorProd(error, res);
};

export const handleDBConnectionError = (error) => {
    console.error('error connecting to db: ' + error.stack);
    process.exit(1);
};
