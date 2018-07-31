import { Post, User, Tag } from '../models';
import { stat } from 'fs';

let controllers = {}

controllers.add = (req,res) => {
  const send = (status,body) => res.status(status).send({status,body});
  const { content, title } = req.body;
  const path = req.file.path.split('public\\')[1];
  const id = req.userId;
  const tags = content.match(/#\w+/g);

  let post = new Post({
    user: id,
    title: title,
    content: content,
    imageUrl: path,        
    date: new Date(),
  });
  post.save(async (err,post) => {
    if (err || !post) send(500, err.message || 'Try again');
    if(post) {
      const postId = post._id;
      User.update({ _id: id }, {
        $push: {
          posts: postId,
        },
      }).exec(); // Handle err
      const ids = await handleTags(tags, postId);
      console.log(ids);
      Post.update({ _id: postId }, {
        $push: {
          tags: {
            $each: ids,
          }
        }
      },(err,postWithTags) => {
        if(err || !postWithTags) console.log(err);
        else {
          console.log('post with tags')
          console.log(postWithTags);
        }
      });
      send(200,post);
    }
  });        
}

// Post.aggregate([
//   { $match: {} },
//   { $project: { title: true, likes: true, content: true, date: true, imageUrl: true, user: true  } }, // $project specify inclusion of fields
//   { $lookup: { from: 'user', localField: 'user', foreignField: '_id', as: "user"}}
//   // { $unwind: '$likes' },
//   // { $group: {
//   //   _id: { likes: '$likes' }
//   // }}
// ], (err,posts) => {
//   if(err) send(500,err)
//   send(200,posts)
// }) // 
controllers.get = (req,res) => {
  const send = (status,body) => res.status(status).send({status,body});

  Post.find({}, 'title content date imageUrl likes').sort({ date: -1 })
  .populate('user', 'username photoUrl -_id').populate({path:'likes', match: { state: true }})
    .exec((err, posts) => {
      if(err || !posts) {
        console.log(err.message)
        send(500, err.message || 'Posts not available');
      } else {
        const newPosts = posts.map(p => {
          const { user, likes } = p;
          return {
            ...p._doc,
            hasLiked: (req.isLogged && likes.some(like => like.user.equals(req.userId))),
            likes: likes.length,
            imageUrl: `${process.env.API_URL}/${p.imageUrl}`,
            user: {
              username: user.username,
              photoUrl: `${process.env.API_URL}/${user.photoUrl}`
            }
          }
        });
        send(200, newPosts);
      }
    })
}


controllers.getUserPosts = (req,res) => {
  const send = (status,body) => res.status(status).send({ status, body });
  const id = req.params.id;
	User.findById(id, 'posts username photoUrl')
	.populate({ 
		path: 'posts',
		select: 'title content imageUrl likes date',
		options: {
			sort: { date: -1 }, 
			populate: { path: 'likes', match: { state: true } } 
		}
	}).exec((err, user) => {
		if(err || !user) send(500, err.message || 'Try again');
		else {
			const newPosts = user.posts.map(post => {
				const likes = post.likes;
				return {
					...post._doc,
					imageUrl: `${process.env.API_URL}/${post.imageUrl}`,
					likes: likes.length,
					hasLiked: likes.some(like => like.user.equals(id)),
					user: {
						username: user.username,
						photoUrl: `${process.env.API_URL}/${user.photoUrl}`,
					}
				}
			});
			send(200, newPosts);
		}
	});
}

controllers.getWithPag = (req,res) => {
  const page = Number(req.params.page);
  const perPage = Number(req.params.perPage);

  Post.find({}).sort({ date: -1 }).skip((page - 1) * perPage).limit(perPage).exec()
  .then(([count, posts]) => {
    res.send({
      status: 200,
      body: { count, posts }
    });
  })
  .catch(err => {
    res.send({ status: 500, body: err.message || 'Try again' });
  })
}

controllers.test = (req,res) => {
  
}


export default controllers;

// Helpers

const handleTags = async (tags,id) => {
  const tagsId = await Promise.all(tags.map(async _tag => {
    const tag = _tag.split('#')[1];
    console.log(tag)
    let val;
    await Tag.findOne({ name: { $eq: tag } }, async (err, exist) => {
      if (err) val = null;
      if (exist) {
        const tagId = exist._id;
        Tag.update({ _id: tagId }, {
          $push: {
            posts: id
          }
        }, (err, tag) => {
          if(err || !tag ) {
            console.log(err);
            val = null;
          } else {
            console.log(tag)
            val = tagId;
          }
        })
        val = tagId;
      } else {
        console.log('new tag')
        let newTag = new Tag({
          name: tag,
          posts: id
        });
        await newTag.save((err, tag) => {
          if (err) val = null;
          if (tag) {
            console.log(tag);
            val = tag._id;
          } else {
            console.log('no tag')
            console.log(tag);
            val = null;
          }
        })
      }
    });
    return val
  }));

  return tagsId.filter(id => id !== null && id !== undefined);
}