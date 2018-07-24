import { Post } from '../models';

function commentPermission(req,res,next) {
  const { postId, commentId } = req.body;

  Post.findById(postId, '_id', (err,post) => {
    
  })
}