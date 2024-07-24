import mongoose from "mongoose";
// import { isEmail } from "validator";
import pkg from 'validator';
const { isEmail } = pkg;
import bcrypt from "bcrypt";
// const mongoose = require("mongoose");
// const { isEmail } = require("validator");
// const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    "username": {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    "email": {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    "password": {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters']
    },
    "description": {
        type: String,
        required: true
    },
    "createdAt": {
        type: Date,
        required: true
    },
    "updatedAt": {
        type: Date,
        required: true
    },
    "admin": {
        type: Boolean,
        required: true,
        default: false
    },
    "adminedAt": {
        type: Date,
        required: false,
        default: null
    },
});
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password.toString(), salt);
    next();
});
const User = mongoose.model('user', userSchema);

// module.exports.default = User;

export default User;