import express from 'express'
import userRouter from './user'
import postRouter from './post';

let router = express.Router();

// Routes 
router.use('/user', userRouter);
router.use('/post', postRouter);

export default router