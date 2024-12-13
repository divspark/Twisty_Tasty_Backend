const mongoose = require("mongoose");
require('dotenv').config();

const mongoUrl = process.env.MONGODB_URL;

const connectDB = ()=>{
     console.log("Connected to MongoDB");
    return mongoose.connect(mongoUrl);
};




module.exports = connectDB;