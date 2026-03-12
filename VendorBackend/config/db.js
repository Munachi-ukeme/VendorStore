// this file connect the web app to the MongoDB. it takes your MONGO_URI from .env and tells Mongoose to connect to it.

const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected successfully");
    } catch(error){
        console.log("mongodb connection failed:", error.message);
        process.exit(1); //this stops the server if connection fails
    }
};

module.exports = connectDB;