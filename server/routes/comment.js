import express from 'express';
import { authMiddlewares } from '../middlewares'
import { CommentControllers } from '../controllers';

let router = express.Router();

// Comments routes
// POST
router.post('/add', authMiddlewares.verifyToken, CommentControllers.add);
// GET
router.get('/get/:id', authMiddlewares.isLogged, CommentControllers.get);
router.get('/get', CommentControllers.getAll);
// DELETE
router.delete('/delete', authMiddlewares.verifyToken, CommentControllers.delete);

// Test routes
// router.get('/test', CommentControllers.test);

export default router;