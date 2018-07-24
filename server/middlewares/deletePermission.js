import { Post } from '../models';

function commentPermission(req,res,next) {
  const { postId, commentId } = req.body;
  const userId = req.userId;

  Post.findById(postId, '_id').populate({path: user, select: '_id'})
  .exec((err, post) => {
    
  })
}