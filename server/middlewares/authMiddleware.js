import jwt from 'jsonwebtoken';
import configs from '../helpers/configs'

function verifyToken(req,res,next) {
  const token = req.headers['x-access-token'];
  if(!token)
    res.status(401).send({ status: 401, response:'No token provided'});
  jwt.verify(token, configs.secret, (err, decoded) => {
    if(err) {
      console.log(err);
      res.status(500).send({ status: 500, body: err.message || 'Try again' });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
}

function isLogged(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    req.isLogged = false;
    next();
  } else {
    jwt.verify(token, configs.secret, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(500).send({ status: 500, body: err.message || 'Try again' });
      } else {
        req.userId = decoded.id;
        req.isLogged = true;
        next();
      }
    });
  }
}

export default { verifyToken, isLogged }