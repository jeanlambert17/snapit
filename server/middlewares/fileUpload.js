import multer from 'multer';
import configs from '../helpers/configs';

function fileUpload(req,res,next) {
    const path = configs.uploadFolder + req.userId + '/';
    const upload = multer({ dest: path }).single('image');
    upload(req,res,(err) => {
        if(err)
            res.status(500).send({ status: 500, body: 'Try again' });
        next();
    });
}

export default fileUpload