import express from 'express';
import { authMiddleware } from '../middlewares'
import { CommentControllers } from '../controllers';

let router = express.Router();

// Comments routes
// POST
router.post('/add', authMiddleware.verifyToken, CommentControllers.add);
// GET
router.get('/get/:id', authMiddleware.isLogged, CommentControllers.get);
router.get('/get', CommentControllers.getAll);
// DELETE
router.delete('/delete', authMiddleware.verifyToken, CommentControllers.delete);

// Test routes
// router.get('/test', CommentControllers.test);

export default router;