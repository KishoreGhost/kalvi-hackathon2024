const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.mongoURI)
        console.log("Database connected 😴")
    }catch(err){
        console.log("Error message: ", err)
    }
}

// const isConnected = () => mongoose.connection.readyState === 1 ? true: false

module.exports = connectDB;

