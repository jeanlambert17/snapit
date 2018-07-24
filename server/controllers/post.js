import { Post, User } from '../models';
import { stat } from 'fs';

let controllers = {}

controllers.add = (req,res) => {
  const { content, title } = req.body;
  const path = req.file.path.split('public\\')[1];
  const id = req.userId;
  const send = (status,body) => res.status(status).send({status,body});
  
  let post = new Post({
    user: id,
    title: title,
    content: content,
    imageUrl: path,        
    date: new Date(),
    // figthers: figthers,
  });
  post.save((err,post) => {
    if (err || !post) send(500, err.message || 'Try again');
    if(post) {
      User.update({ _id: id }, {
        $push: {
          posts: post._id,
        },
      }).exec(); // Handle err
      send(200,post);
    }
  });        
}

controllers.get = (req,res) => {
  const send = (status,body) => res.status(status).send({status,body});
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
  // })
  // PROBAR MEJOR MANANANANANANANA, Y ANADIR VER PARA USUARIOS E INVITADOS
  Post.find({}, 'title content date imageUrl likes').sort({date:-1})
  .populate('user', 'username photoUrl -_id').populate({ path: 'likes', match: { _id: req.userId }})
  .exec((err,posts) => {
    if(err || !posts) {
      console.log(err.message)
      send(500, err.message || 'Posts not available');
    }
    if(posts) { 
      const newPosts = posts.map(p => {
        const { user } = p;
        return {
          ...p._doc,
          // likes: p.likes.length,
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