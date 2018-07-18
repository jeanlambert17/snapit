import express from 'express';
import { isNew, verifyToken, userData, emptyFields, fileUpload } from '../middlewares'
import { UserControllers } from '../controllers';

let router = express.Router();

// User's routes
router.post('/signUp', emptyFields, isNew, UserControllers.signUp);
router.post('/login', emptyFields, UserControllers.logIn);
router.get('/userData', verifyToken, UserControllers.userData);
router.post('/updateField', verifyToken, UserControllers.updateField);
router.post('/updatePhoto', verifyToken, fileUpload, UserControllers.updatePhotoUrl);

// On develop
router.post('/updatePassword', verifyToken, UserControllers.updatePassword);

// Test routes
router.get('/test', verifyToken, userData, UserControllers.test);

export default router;