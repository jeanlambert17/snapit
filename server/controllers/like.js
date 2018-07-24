import { Like } from '../models';
import User from '../models/user';
import Post from '../models/post';

let controllers = {};

controllers.addOrUpdate = (req,res) => {
  const { userId, hasLiked, likeState } = req;
  const postId = req.body.postId;
  const send = (status,body) => res.status(status).send({ status, body });
  
  if(hasLiked) {
    Like.where({ user: userId, post: postId }).update({ state: !likeState })
    .exec((err, like) => {
      if(err || !like) {
        console.log(err.message);
        send(500, err.message || 'Try again');
      }
      if(like) send(200,'Success');
    })
  } else {
    let like = new Like({
      state: true,
      user: userId,
      post: postId,
    })
    like.save((err, like) => {
      if(err || !like) {
        console.log(err)
        send(500, err.message || 'Try again');
      }
      if(likes) {
        Post.update({ _id: id }, {
          $push: {
            likes: likes._id,
          }
        }).exec(); // Handle err
        send(200,'Success');
      }
    })
  }
  
}

controllers.likes = (req,res) => {
  const userId = req.userId;
  const send = (status, body) => res.status(status).send({ status, body });

  Like.where({user: userId}).find({}, (err,likes) => {
    if(err) send(500, err.message || 'Try again');
    if(likes) {
      send(200, likes);
    }
  })
}
export default controllers;