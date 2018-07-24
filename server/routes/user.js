import express from 'express';
import { isNew, authMiddleware, userData, emptyFields, fileUpload } from '../middlewares'
import { UserControllers } from '../controllers';

let router = express.Router();

// User's routes
router.post('/signUp', emptyFields, isNew, UserControllers.signUp);
router.post('/login', emptyFields, UserControllers.logIn);
router.get('/auth', authMiddleware.verifyToken, UserControllers.userData);
router.get('/posts', authMiddleware.verifyToken, UserControllers.userPosts);
router.post('/update/field', authMiddleware.verifyToken, UserControllers.updateField);
router.post('/update/photo', authMiddleware.verifyToken, fileUpload, UserControllers.updatePhotoUrl);

// On develop
router.post('/update/password', authMiddleware.verifyToken, UserControllers.updatePassword);

export default router;