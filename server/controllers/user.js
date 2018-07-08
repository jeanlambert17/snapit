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

controllers.changeField = (req,res) => {
    const { key, value, password } = req.body;
    const id = req.userId;
    const send = ({status,body}) => res.status(status).send({ status, body });

    User.findOne({ _id: id }, async (err, user) => {
        if (err) send({ status: 500, body: 'Try again' });
        if (!user) send({ status: 500, body: 'Unable to reach user data' });
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            User.findOne({ [key]: value }, key, async (err, _user) => {
                if (err) send({ status: 500, body: 'Try again later' });
                if (_user) // 403 - El servidor ha podido ser contactado, y ha recibido una petición válida, pero ha denegado el acceso a la acción que se solicita
                    send({ status: 403, body: 'Value already exist' });
                else { // Update user data
                    user.set({ [key]: value });
                    user.save((err, updatedUser) => {
                        if (err) send({ status: 400, body: 'Try again later' });
                        if (updatedUser) send({
                            status: 200,
                            body: {
                                username: updatedUser.username,
                                name: updatedUser.name,
                                email: updatedUser.email,
                            }
                        });
                    });
                }
            });
        } else send({ status: 401, body: 'Invalid credentials' });
    });
}

controllers.changePassword = (req,res) => {
    const { password, newPassword } = req.body;
    const id = req.userId;
    const send = ({ status, body }) => res.status(status).send({ status, body });
    
    User.findOne({ _id: id }, async (err, user) => {
        if (err) send({ status: 500, body: 'Try again' });
        if (!user) send({ status: 500, body: 'Unable to reach user data' });
        let isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            let hash = await bcrypt.hashSync(password, 10);
            user.password = newPassword;
            user.save((err,updatedUser) => {
                if(err) send({ status: 500, body: 'Try again' });
                send({ status: 200, body: 'Success' });
            });
        }
    });
}

controllers.getData = (req,res) => {
    User.findById(req.userId).populate('posts').exec((err, user) => {
        res.send(user);
    })
}

export default controllers;