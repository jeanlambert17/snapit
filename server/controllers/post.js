import { Post, User } from '../models';

let controllers = {}

controllers.add = (req,res) => {
  const { content, title } = req.body;
  const path = req.file.path.split('public\\')[1];
  const id = req.userId;
  
  let post = new Post({
    user: id,
    title: title,
    content: content,
    imageUrl: path,        
    date: new Date(),
    // figthers: figthers,
  });
  post.save((err) => {
    if (err)
      res.status(500).send({
        status: 500,
        body: 'Try again',
      });
    User.update({ _id: id }, {
      $push: {
        posts: post._id,
      },
    }).exec();
    res.status(200).send({
      status: 200,
      body: 'Success',
    });
  });        
}

controllers.getPosts = (req,res) => {
  const page = Number(req.params.page);
  const perPage = Number(req.params.perPage);

  Post.find({}).skip((page-1)*perPage).limit(perPage).exec()
  .then((posts) => {
    res.send({ 
      status:200, 
      body: posts
    });
  })
  .catch(err => {
    res.send({ status: 500, body: err.message || 'Try again' });
  })
}


export default controllers;