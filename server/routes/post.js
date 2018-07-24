import express from 'express';
import { authMiddleware, fileUpload, userData } from '../middlewares'
import { PostControllers } from '../controllers';

let router = express.Router();

// Posts routes
// POST
router.post('/add', authMiddleware.verifyToken, fileUpload, PostControllers.add);
// GET
router.get('/get', authMiddleware.isLogged, PostControllers.get);
router.get('/get/:page/:perPage', PostControllers.getWithPag);

// Test routes
router.get('/test', PostControllers.test);

export default router;