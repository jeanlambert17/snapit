import multer from 'multer';
import configs from '../helpers/configs';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
			cb(null, `${configs.uploadFolder}${req.userId}/`);
    },
    filename: function (req,file,cb) {
			console.log(file);
			cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage: storage }).single('image');

function fileUpload(req,res,next) {
	const path = `${configs.uploadFolder}${req.userId}`;
	console.log(req.body);
	fs.exists(path, (exist) => {
		if(exist) {
			upload(req,res,(err) => {
				if(err) {
					console.log('upload err: ' + err);
					res.status(500).send({ status: 500, body: err.message || 'Try again' });
				}
				next();
			})
		} else {
			fs.mkdir(path, (err) => {
				if (err) {
					console.log('mkdir err: ' + err);
					res.status(500).send({ status: 500, body: err.message || 'Try again' });
				} else {
					upload(req, res, (err) => {
						if (err) {
							console.log('upload err: ' + err);
							res.status(500).send({ status: 500, body: err.message || 'Try again' });
						}
						next();
					});
				}
			});
		}
	});
}

export default fileUpload
