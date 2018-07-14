import express from 'express';
import { isNew, verifyToken, userData, availableFieldsToChange, emptyFields } from '../middlewares'
import { UserControllers } from '../controllers';

let router = express.Router();

// User's routes
router.post('/signUp', emptyFields, isNew, UserControllers.signUp);
router.post('/login', emptyFields, UserControllers.logIn);
router.get('/userData', verifyToken, UserControllers.userData);

// On develop
// router.post('/changeField', availableFieldsToChange, verifyToken, UserControllers.changeField);
router.post('/changeField', verifyToken, UserControllers.changeField);
router.post('/changePassword', verifyToken, UserControllers.changePassword);

// Test routes
router.get('/test', verifyToken, userData, UserControllers.getData);

export default router;