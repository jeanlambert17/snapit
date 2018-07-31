import express from 'express';
import { authMiddleware, fileUpload, userData } from '../middlewares'
import { PostControllers } from '../controllers';

let router = express.Router();

router.post('/add', authMiddleware.verifyToken, fileUpload, PostControllers.add);
router.get('/get', authMiddleware.isLogged, PostControllers.get);
router.get('/get/:id', PostControllers.getUserPosts)
router.get('/get/:page/:perPage', PostControllers.getWithPag);

// Test routes
router.get('/test', PostControllers.test);

export default router;