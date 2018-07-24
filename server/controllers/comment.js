import { Comment, Post, User } from '../models';
import { unwatchFile } from 'fs';

let controllers = {}

controllers.add = (req,res) => {
  const { content, postId } = req.body;
  const id = req.userId;
  const send = (status,body) => res.status(status).send({ status, body });
  
  let comment = new Comment({
    user: id,
    content: content,
    date: new Date(),
    post: postId,
  });
  comment.save((err,comment) => {
    if(err) {
      console.log(err);
      send(500, err.message || 'Try again');
    }
    if(comment) {
      Post.update({ _id: postId }, {
        $push: {
          comments: comment._id,
        },
      }).exec((err, post) => {
        if (err) {
          console.log(err);
          send(500, err.mesosage || 'Try again');
        }
        if(post) {
          comment.populate('user', 'username photoUrl -_id', (err,populatedComment) => {
            if(err) {
              send(500, err.message || 'Try again');
            }
            if(populatedComment) {
              const { user } = populatedComment;
              send(200, { 
                ...populatedComment._doc, 
                user: { 
                  username: user.username,
                  photoUrl: `${process.env.API_URL}/${user.photoUrl}`
                },
              });
            } else {
              send(500, comment);
            }
          })          
        } else {
          send(500, 'Error saving the comment, try again');
        }
      });
    } else {
      send(500, 'Unable to comment this post');
    }
  });
}

// Method to delete own user comment
controllers.delete = (req,res) => {
  const { commentId, postId } = req.body;
  const send = (status, body) => res.status(status).send({ status, body });

  Comment.findByIdAndRemove(commentId, (err, comment) => {
    if(err) send(500, err.message || 'Could not delete the comment')
    if(!comment) {
      Post.update({ _id: postId }, { $pull: { comments: { $in: commentId }}}, {multi:false}, (err,post) => {
        if(err) send(500, err.message || 'Try again');
        if(post && post.nModified > 0) {
          send(200, 'Success');
        } else {
          send(404, 'Comment not found');
        }
      })
    } else {
      send(404, 'Comment not found');
    }
  })
}

controllers.get = (req,res) => {
  const postId = req.params.id;
  const send = (status, body) => res.status(status).send({ status, body });

  Comment.find({ post: postId }, 'user content date -_id').populate('user', 'username photoUrl')
  .exec((err, comments) => {
    if(err) send(500, err.message || 'Try again');
    if (comments) {
      const newComments = comments.map(c => {
        const { user } = c;
        return {
          isUserComment: (req.isLogged && user._id.equals(req.userId)) ? true : false,
          ...c._doc,
          user: {
            username: user.username,
            photoUrl: `${process.env.API_URL}/${user.photoUrl}`
          }
        }
      });
      send(200, newComments);
    } else {
      send(500, 'Comments not found');
    }
  })
}

controllers.getAll = (req,res) => {
  Comment.find({}, (err,comments) => {
    if (err) {
      console.log(err);
      send(500, err.message || 'Try again')
    }
    if (comments) {
      send(200, comments);
    }
  })
}
export default controllers