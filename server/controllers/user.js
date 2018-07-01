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
    let {email,password} = req.body;
    
    User.findOne({ 'email': email }, async (err,user) => {
        console.log(user)
            if(err) 
                res.status(500).send({
                    status: 500,
                    body: 'Try again' 
                });
            if(!user) 
                res.status(401).send({ 
                    status: 401,
                    body: 'Email does not exist' 
                });
            let isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) 
                res.status(401).send({
                    status: 401,
                    body:'Wrong password',
                });
            
            let token = jwt.sign({ id: user._id}, configs.secret, { expiresIn: 86400 }); // 24 hours
            res.status(200).send({ token: token });
        }
    );

}

controllers.getData = (req,res) => {
    res.status(200).send({id:req.userId});
}

export default controllers;