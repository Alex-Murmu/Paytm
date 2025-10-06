const mongoose = require("mongoose");

const connectDB =async()=>{
    try {
        console.log(process.env.MONGO_URL)
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database is connected",conn.connection.host);
    } catch (error) {
        console.log(`error : ${error.message}`);
    }
};

module.exports = connectDB;