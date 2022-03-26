import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
//import error controller
import app from './src/app';
import db from './src/models/dbConnection';

//listen for uncaught synchronous exceptions
//init db connection

//listen for requests
const port = Number(process.env.PORT) || 3000;
const server = app.listen(port, () => {
    console.log('Server started. Listening for requests on port: ' + port);
});
