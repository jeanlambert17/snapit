import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import configs from '../helpers/configs'
import { User } from '../models'

let controllers = {}

controllers.signUp = (req,res) => {
    let { name, username, email, password } = req.body;
    let hash = bcrypt.hashSync(password, 10);
    // TODO: Anadir verificaciones
    User.create({
        name: name,
        email: email,
        username: username,
        password: hash,
    }, (err) => {
        if (err) {
            res.status(500).send({
                status: 500,
                body: 'Try again'
            });
        }
        res.status(200).send({
            status: 200,
            body: 'Success'
        });
    });

}

controllers.logIn = (req,res) => {
    let { username, password } = req.body;
    console.log(username);
    console.log(password);
    User.findOne({ 'username': username }, async (err,user) => {
        console.log(user)
            if(err) 
                res.status(500).send({
                    status: 500,
                    body: 'Try again' 
                });
            if(!user) 
                res.status(401).send({ 
                    status: 401,
                    body: 'Username does not exist' 
                });
            let isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) 
                res.status(401).send({
                    status: 401,
                    body:'Wrong password',
                });
            
            let token = jwt.sign({ id: user._id }, configs.secret, { expiresIn: 86400 }); // 24 hours
            console.log('User login: ');
            console.log(user);
            res.status(200).send({ 
                status: 200, 
                body: {
                    username: user.username,
                    name: user.name,
                    email: user.email,
                },
                token: token 
            });
        }
    );

}

controllers.getData = (req,res) => {
    User.findById(req.userId).populate('posts').exec((err, user) => {
        res.send(user);
    })
}

export default controllers;