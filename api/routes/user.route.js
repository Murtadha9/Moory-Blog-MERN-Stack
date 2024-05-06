
import express from 'express';
import {deleteUser ,signout ,getUsers} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router=express.Router();



router.delete('/delete/:userId', verifyToken ,deleteUser);
router.post('/signout' , signout);
router.get('/getusers' ,verifyToken ,getUsers)


export default router;