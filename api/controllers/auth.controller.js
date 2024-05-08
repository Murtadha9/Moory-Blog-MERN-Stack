import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup=async(req,res ,next)=>{
    const {username,email,password , photoURL}=req.body;
    

    if(!username || !email || !password || username==="" || email==="" || password===""){
        return next(errorHandler(400,'all fileds are required'));
    }

    const hashPassword= bcryptjs.hashSync(password,10)

    const newUser= new User({username,email,password:hashPassword ,photoURL})

    try {
        await newUser.save();
        res.status(201).json({message:'user created'  })
    } catch (error) {
        next(error);
    }
   
}



export const signin=async(req,res,next)=>{
    const {email ,password}=req.body;
    if(!email || !password || email==="" || password===""){
        return next(errorHandler(400,'all fileds are required'));
    }

    try {
        const validUser= await User.findOne({email})

        if(!validUser){
            return next(errorHandler(404,'User not found'));
        }
        const isPassword=bcryptjs.compareSync(password,validUser.password)
        if(!isPassword){
            return next(errorHandler(400,'invalid  password'));
        }

        const token =jwt.sign(
            {id:validUser._id , isAdmin:validUser.isAdmin},
            process.env.JWT_SECRET,
        )
        const {password:pass ,...others}=validUser._doc
        res.status(200).cookie('access_token',token ,{httpOnly:true}).json(others)
    } catch (error) {
        next(error);
    }
}

export const google=async(req,res,next)=>{
    const {name ,email,GooglePhotoURL } =req.body;
    try {
        const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id , isAdmin:user.isAdmin},
        process.env.JWT_SECRET
      );
      const { password, ...others } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(others);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        photoURL: GooglePhotoURL,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id ,isAdmin:newUser.isAdmin},
        process.env.JWT_SECRET
      );
      const { password, ...others } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(others);
    }
        
    } catch (error) {
        next(error);
    }
}






