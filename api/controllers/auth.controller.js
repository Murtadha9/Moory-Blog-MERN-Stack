import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';



export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Check if required fields are missing or empty
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required.'));
    }

    try {
        // Asynchronously hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword // Store the hashed password in the database
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        res.json("User created successfully");
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
};


export const signin= async (req ,res,next)=>{
    const { email, password } = req.body;
    
    if(!email || !password || email=='' || password==''){
        return next(errorHandler(400 ,'Invalid username or password'))
    }

    try {
        const validUser = await User.findOne({ email: email})
        if(!validUser){
            return next(errorHandler(404, 'User not found'));
        }
        const isMatchPassword = bcryptjs.compareSync(password, validUser.password);
        if(!isMatchPassword){
            return next(errorHandler(400, 'Invalid  password'));
        }

        const token = jwt.sign({ id: validUser._id , isAdmin:validUser.isAdmin }, process.env.JWT_SECRET);

        const {password:pass , ...others }=validUser._doc

        res.status(200).cookie('access_token', token ,{httpOnly:true}).json(others);

        

    } catch (error) {
        next(error);
    }

}

export const google=async(req,res,next)=>{
    const {email,name,photoURL}=req.body;
    try {
        const user=await User.findOne({email});
        if(user){
            const token = jwt.sign({ id: user._id  ,isAdmin:user.isAdmin}, process.env.JWT_SECRET);
            const {password:pass , ...others}=user._doc
            res.status(200).cookie('access_token', token ,{httpOnly:true}).json(others);
        }else{
            const generatePassword=Math.random().toString(36).slice(8)+Math.random().toString(36).slice(8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(8).slice(-4),
                email,
                password:hashedPassword,
                photoURL
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id ,isAdmin:newUser.isAdmin}, process.env.JWT_SECRET);
            const {password:pass , ...others}=newUser._doc
            res.status(200).cookie('access_token', token ,{httpOnly:true}).json(others);

        }
        
    } catch (error) {
        next(error);
        
    }

}


