const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./src/config/db");
const UserRouter  = require("./src/routes/index")
const app = express();

app.use(cors());
app.use(express.json());

connectDB();



app.use("/api",UserRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // console me pura error dikhayega

    res.status(err.status || 500).json({
        success: false,
        message: `error handler ${err.message}` || "Something went wrong!",
    });
});

app.listen(process.env.PORT,()=>{
    console.log("server is Runnig")
})