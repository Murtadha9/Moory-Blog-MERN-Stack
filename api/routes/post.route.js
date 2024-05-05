

import express from 'express';
import { getPosts } from '../controllers/post.controllers.js';


const router=express.Router();

router.get('/getposts' , getPosts)




export default router;