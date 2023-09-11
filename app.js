import express from "express";
import {PORT, mongoDBURL} from "./config.js"
import mongoose from 'mongoose';
import moviesRoute from "./routes/moviesRoute.js"
import cors from 'cors'
import router from "./routes/index.js"
import dotenv from 'dotenv'

dotenv.config()
const app = express();

app.use(express.json())
app.use(cors())
app.use(router)
app.use('/movie', moviesRoute)
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))



mongoose
    .connect(mongoDBURL)
    .then(() =>{
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`app is listening to port : ${PORT}`)
        }); 
    })
    .catch((error)=>{
        console.log(error)
    })