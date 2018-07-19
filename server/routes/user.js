import express from 'express';
import { isNew, verifyToken, userData, emptyFields, fileUpload } from '../middlewares'
import { UserControllers } from '../controllers';

let router = express.Router();

// User's routes
router.post('/signUp', emptyFields, isNew, UserControllers.signUp);
router.post('/login', emptyFields, UserControllers.logIn);
router.get('/auth', verifyToken, UserControllers.userData);
router.get('/posts', verifyToken, UserControllers.userPosts);
router.post('/update/field', verifyToken, UserControllers.updateField);
router.post('/update/photo', verifyToken, fileUpload, UserControllers.updatePhotoUrl);

// On develop
router.post('/update/password', verifyToken, UserControllers.updatePassword);

export default router;