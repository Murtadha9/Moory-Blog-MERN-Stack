
import express from 'express';
import dotenv from 'dotenv'
import  mongoose  from 'mongoose';

import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js'
import commentRoute  from './routes/comment.route.js';

import cookieParser from 'cookie-parser'

dotenv.config();
const app= express();



//Mongo

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

app.use(express.json())
app.use(cookieParser())

//EndPoints
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute)


//MiddleWare

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });








