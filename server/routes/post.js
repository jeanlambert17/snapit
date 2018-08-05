import express from 'express';
import { authMiddleware, fileUpload, userData } from '../middlewares'
import { PostControllers } from '../controllers';
import gm from 'gm';

let router = express.Router();

router.post('/add', authMiddleware.verifyToken, fileUpload, (req,res,next) => {
  // const dir = __dirname.split('\\routes')[0]
  // // res.send({
  // //   i: dir + '\\' + req.file.path,
  // //   file: req.file,
  // // })
  // gm(dir+'\\public\\img').resize(480,480)
  // .write(dir + '\\' +req.file.path + '\\public\\img.jpg', (err) => {
  //   if(err) {
  //     console.log(err)
  //   } else {
  //     res.send('sucess')
  //   }
  // })
  next();

}, PostControllers.add);
router.get('/get', authMiddleware.isLogged, PostControllers.get);
router.get('/get/:id', authMiddleware.isLogged, PostControllers.getUserPosts)
router.get('/get/:page/:perPage', PostControllers.getWithPag);
router.get('/getByTag/:tag', authMiddleware.isLogged, PostControllers.getByTag);

// Test routes
router.get('/test', PostControllers.test);

export default router;