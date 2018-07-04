import jwt from 'jsonwebtoken';
import configs from '../helpers/configs'

function verifyToken(req,res,next) {
    let token = req.headers['x-access-token'];
    if(!token)
        res.status(403).send({ status: 403, response:'No token provided'});
    jwt.verify(token, configs.secret, (err, decoded) => {
        if(err) {
            res.status(500).send({ status: 500, response: 'Try again' });
        } else {
            req.userId = decoded.id;
            next();
        }
    });
}

export default verifyToken