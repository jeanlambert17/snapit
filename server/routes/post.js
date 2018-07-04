import express from 'express';
import { verifyToken, fileUpload, userData } from '../middlewares'
import { PostControllers } from '../controllers';

let router = express.Router();

// User's routes
router.post('/add', verifyToken, fileUpload, PostControllers.add);

// Test routes
router.get('/test', verifyToken, PostControllers.getPosts);
router.post('/testUpload', verifyToken, fileUpload, (req,res) => {
    res.send('ok');
})

export default router;