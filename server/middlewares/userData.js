import { User } from '../models'

function userData(req, res, next) {
  const id = req.userId;

  User.findOne({ _id: id }, async (err,user) => {
    if(err) 
      res.status(500).send({ status: 500, body: 'Try again' });
    if(!user) {
      res.status(500).send({ status: 500, body: 'Unable to reach user data' });
    } else {
      req.userData = user;
      next();
    }
  });
}

export default userData