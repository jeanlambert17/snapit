import express from 'express';
import { authMiddleware, didLike } from '../middlewares'
import { LikeControllers } from '../controllers';

let router = express.Router();

// Like's routes
// POST
router.post('/do', authMiddleware.verifyToken, didLike, LikeControllers.addOrUpdate);
// GET
router.get('/get', authMiddleware.verifyToken, LikeControllers.likes);

export default router;