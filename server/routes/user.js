import express from 'express';
import { isNew, verifyToken, userData, availableFieldsToChange } from '../middlewares'
import { UserControllers } from '../controllers';

let router = express.Router();

// User's routes
router.post('/signup', isNew, UserControllers.signUp);
router.post('/login', UserControllers.logIn);

// On develop
router.post('/changeField', availableFieldsToChange, verifyToken, UserControllers.changeField);
router.post('/changePassword', verifyToken, UserControllers.changePassword);

// Test routes
router.get('/test', verifyToken, userData, UserControllers.getData);

export default router;