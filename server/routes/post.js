import express from 'express';
import { verifyToken, fileUpload, userData } from '../middlewares'
import { PostControllers } from '../controllers';

let router = express.Router();

// User's routes
router.post('/add', verifyToken, fileUpload, PostControllers.add);
router.get('/get', PostControllers.getPosts);
router.get('/get/:page/:perPage', PostControllers.getPostsWithPag);

// Test routes
router.get('/test', PostControllers.test);

export default router;