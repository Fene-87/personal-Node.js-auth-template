import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";

const app = express();

dotenv.config();

// middlewares
app.use(express.static('public'))
app.use(cors());
app.use(express.json())

// routes
app.use('/server', authRoute);

// database connection
// connect server first then db
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to database")
    } catch (error) {
        throw error;
    }
}

app.listen(8000, () => {
    connectMongoDB();
    console.log("Server is running");
})

// connect db first then server
// mongoose.connect(process.env.Mongo)
//   .then((result) => {
//     app.listen(8000)
//     console.log("Server is running")
//   })
//   .catch((err) => console.error(err))
