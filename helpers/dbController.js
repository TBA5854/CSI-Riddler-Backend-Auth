const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.DB_URL);
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected');
    });
}

exports.connectDB = connectDB;