import express from "express"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRoute from "./routes/AuthRoute.js"
import UserRoute from "./routes/UserRoute.js"

// congfirations 
const app = express();
dotenv.config();
app.use(express.json());
const port = 5000;


// mongoDB connection
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connected to db")
    }).catch((err) => {
        console.log(err)
    })
}




//App listen at
app.listen(port, () => {
    connectDB();
    console.log(`app is listenint at port ${port}`)
})


// routes
app.use("/api/auth", AuthRoute)
app.use("/api/user", UserRoute)
