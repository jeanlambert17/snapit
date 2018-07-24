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
      if(like) {
        Post.update({ _id: postId }, {
          $push: {
            likes: like._id,
          }
        }).exec((err,post) => {
          if(err || !post) send(500, err.message || 'Try again')
          if(post) {
            send(200, post);
          }
        }); // Handle err
        
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