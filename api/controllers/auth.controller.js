import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup=async(req,res ,next)=>{
    const {username,email,password}=req.body;
    const { filename } = req.file;

    if(!username || !email || !password || username==="" || email==="" || password===""){
        return next(errorHandler(400,'all fileds are required'));
    }

    const hashPassword= bcryptjs.hashSync(password,10)

    const newUser= new User({username,email,password:hashPassword ,photoURL:filename})

    try {
        await newUser.save();
        res.status(201).json({message:'user created' , filename })
    } catch (error) {
        next(error);
    }
   
}










