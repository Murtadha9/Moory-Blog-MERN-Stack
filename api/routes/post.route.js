

import express from 'express';
import { getPosts  ,deletePost ,updatepost} from '../controllers/post.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';


const router=express.Router();

router.get('/getposts' , getPosts)
router.delete('/delete/:postId/:userId',verifyToken , deletePost);
router.put('/updatepost/:postId/:userId',verifyToken , updatepost);



export default router;