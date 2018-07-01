import express from 'express'
import userRouter from './user'

let router = express.Router();

// Routes 
router.use('/user', userRouter);

export default router