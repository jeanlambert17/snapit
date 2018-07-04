import express from 'express';
import { isNew, verifyToken, userData } from '../middlewares'
import { UserControllers } from '../controllers';

let router = express.Router();

// User's routes
router.post('/signup', isNew, UserControllers.signUp);
router.post('/login', UserControllers.logIn);
router.get('/data', verifyToken, userData, UserControllers.getData);

export default router;