import Like from "../models/like";

export default (req,res,next) => {
  const userId = req.userId;
  const { postId } = req.body;
  const send = (status,body) => res.status(status).send({ status, body });

  Like.where({ user: userId, post: postId }).findOne((err, like) => {
    if(err) {
      console.log(err);
      send(500, err.message || 'Try again');
    }
    if(like) {
      req.hasLiked = true;
      req.likeState = like.state;
      next();
    } else {
      req.hasLiked = false;
      next();
    }
  })
}