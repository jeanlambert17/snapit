import { Post, User } from '../models';

let controllers = {}

controllers.add = (req,res) => {
    const { content, title, figthers } = req.body;
    console.log(req.file);
    const { path } = req.file;
    const id = req.userId;
    
    let post = new Post({
        user: id,
        title: title,
        content: content,
        imageUrl: path,        
        date: new Date(),
        figthers: figthers,
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
    let id = req.userId;
    Post.find().exec((err, data) => {
        if(err) console.log(err);
        res.send(data)
    });
}

export default controllers;