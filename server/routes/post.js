import express from 'express';
import { verifyToken, userData } from '../middlewares'
import { PostControllers } from '../controllers';

let router = express.Router();

// User's routes
router.post('/add', verifyToken, PostControllers.add);
router.get('/data', verifyToken, PostControllers.getPosts);

export default router;