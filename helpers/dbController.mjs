import mongooose from "mongoose";
// const mongooose = require("mongoose");

export function connectDB() {
    mongooose.connect(process.env.DB_URL);
    const connection = mongooose.connection;
    connection.once('open', () => {
        console.log('Database connected');
    });
}
