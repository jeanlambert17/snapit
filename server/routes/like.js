import express from 'express';
import { authMiddlewares, didLike } from '../middlewares'
import { LikeControllers } from '../controllers';

let router = express.Router();

// Like's routes
// POST
router.post('/do', authMiddlewares.verifyToken, didLike, LikeControllers.addOrUpdate);
// GET
router.get('/get', authMiddlewares.verifyToken, LikeControllers.likes);

export default router;