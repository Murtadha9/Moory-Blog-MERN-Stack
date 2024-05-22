
import express from 'express';
import dotenv from 'dotenv'
import  mongoose  from 'mongoose';



import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'

import cookieParser from 'cookie-parser'
//import { signup } from './controllers/auth.controller.js';
//import { verifyToken } from './utils/verifyUser.js';
//import { updateUser } from './controllers/user.controller.js';
//import { create } from './controllers/post.controllers.js';

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








//Endpoints with files
//app.post('/api/auth/signup' , upload.single('photoURL'), signup)
//app.put('/api/users/update/:userId', upload.single('photoURL') , verifyToken , updateUser)
//app.post('/api/posts/create', upload.single('photoURL') , verifyToken ,create)


//EndPoints
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comment', commentRoutes);



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








