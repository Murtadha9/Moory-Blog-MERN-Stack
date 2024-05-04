
import express from 'express';
import dotenv from 'dotenv'
import  mongoose  from 'mongoose';
import multer from 'multer';

import authRoutes from './routes/auth.route.js'


import cookieParser from 'cookie-parser'
import { signup } from './controllers/auth.controller.js';
import { verifyToken } from './utils/verifyUser.js';
import { updateUser } from './controllers/user.controller.js';

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


//Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/'); // Uploads will be stored in 'uploads/' directory
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });




//Endpoints with files
app.post('/api/auth/signup' , upload.single('photoURL'), signup)
app.put('/api/users/update/:userId', upload.single('photoURL') , verifyToken , updateUser)


//EndPoints
app.use('/api/auth', authRoutes)




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








