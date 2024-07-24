import express from 'express';
import cookieParser from "cookie-parser";
import router from '../routes/authRoute.mjs';
import { connectDB } from "../helpers/dbController.mjs";
import { authverify } from '../middleware/authMiddleware.mjs';
import { config } from "dotenv";
// const express = require('express');
// const cookieParser = require("cookie-parser");
// const router = require('../routes/authRoute');
// const { connectDB } = require("../helpers/dbController");
// const { authverify } = require('../middleware/authMiddleware');
// const { config } = require("dotenv");

const app = express();

config();

app.use(express.json());
app.use(cookieParser());
app.use(router);

connectDB();

const port = 3000;

app.get('/', authverify, (_req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Auth Server port ${port}!`));
