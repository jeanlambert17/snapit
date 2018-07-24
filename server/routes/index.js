import express from 'express'
import userRouter from './user'
import postRouter from './post';
import commentRouter from './comment';
import likeRouter from './like';

let router = express.Router();

// Routes 
router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/like', likeRouter);

export default router