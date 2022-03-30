const dotenv = require('dotenv');
//read environment variables
dotenv.config({ path: './config.env' });

const errorController = require('./src/errors/errorController');
const app = require('./src/app');
const db = require('./src/models/dbConnection');

//listen for uncaught synchronous exceptions
process.on('uncaughtException', errorController.handleUncaughtException);

//TODO init db connection
db.initConnection();

//listen for requests
const port = Number(process.env.PORT) || 3000;
const server = app.listen(port, () => {
    console.log('Server started. Listening for requests on port: ' + port);
});

//start listening for unhandled rejections on the global asynchronous exception system
process.on(
    'unhandledRejection',
    errorController.handleUnhandledRejection(server)
);
