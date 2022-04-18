const mysql = require('mysql');

let connection;

module.exports.getConnection = () => {
    return connection;
};

module.exports.queryAsync = (connection, sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
};

module.exports.initConnection = () => {
    const configuration = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DBNAME,
        insecureAuth: process.env.DB_INSECURE_AUTH,
        multipleStatements: true,
    };

    connection = mysql.createConnection(configuration);

    addDisconnectHandler(connection);

    connection.connect();
};

const addDisconnectHandler = (connection) => {
    connection.on('error', function (error) {
        if (error instanceof Error) {
            if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error(error.stack);
                console.log('Lost connection. Reconnecting...');

                initializeConnection(connection.config);
            } else if (error.fatal) {
                throw error;
            }
        }
    });
};
