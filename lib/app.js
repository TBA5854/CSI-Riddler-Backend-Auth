const express = require("express");
const cookie_parser = require("cookie-parser");
const router = require("../routes/authRoute");
const dbController = require("../helpers/dbController");
const authMiddleware = require("../middleware/authMiddleware");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookie_parser());
app.use(router);

dbController.connectDB();

const port = 3000;

app.get('/', authMiddleware.authverify, (_req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Auth Server port ${port}!`));
