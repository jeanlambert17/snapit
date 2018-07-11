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
    }, (err, user) => {
        console.log('USER_signup: ');
        console.log(user);
        if (err) {
            res.status(500).send({
                status: 500,
                body: 'Try again'
            });
        }
        if (user) res.status(200).send({
            status: 200,
            body: {
                username: user.username,
                email: user.email,
                name: user.name,
            },
        });
    });

}

controllers.logIn = (req,res) => {
    const { username, password } = req.body;
    const send = ({status,body, ...rest}) => res.status(status).send({status,body, ...rest});
    User.findOne({ 'username': username }, async (err,user) => {
        if(err) send({ status: 500, body: 'Try again' });
        if(!user) send({ status: 401, body: 'Username does not exist' });
        try {
            let isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) send({ status: 401, body: 'Invalid credentials' });
            let token = jwt.sign({ id: user._id }, configs.secret, { expiresIn: 86400 }); // 24 hours
            console.log('User login: ');
            console.log(user);
            send({
                status: 200,
                body: {
                    username: user.username,
                    name: user.name,
                    email: user.email,
                },
                token: token
            });
        } catch(err) {
            console.log(err);
            send({ status: 500, body: 'Try again' });
        }
    });

}

controllers.changeField = (req,res) => {
    const { key, value, password } = req.body;
    const id = req.userId;
    const send = ({status,body}) => res.status(status).send({ status, body });

    User.findById(id, async (err, user) => {
        if (err) send({ status: 500, body: 'Try again' });
        if (!user) send({ status: 500, body: 'Unable to reach user data' });
        try {
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
        } catch(err) {
            console.log('catch err: ' + err);
            send({ status: 500, body: 'Try again' });
        }
    });
}

controllers.changePassword = (req,res) => {
    const { password, newPassword } = req.body;
    const id = req.userId;
    const send = ({ status, body }) => res.status(status).send({ status, body });

    User.findById(id, async (err, user) => {
        if (err) send({ status: 500, body: 'Try again' });
        if (!user) send({ status: 500, body: 'Unable to reach user data' });
        try {
            let isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                let hash = await bcrypt.hashSync(newPassword, 10);
                user.password = hash;
                user.save((err,updatedUser) => {
                    if(err) send({ status: 500, body: 'Try again' });
                    send({ status: 200, body: 'Success' });
                });
            } else send({ status: 401, body: 'Invalid credentials' });
        } catch(err) {
            console.log('catch err: ' + err);
            send({ status: 500, body:'Try again' });
        }
    });
}

controllers.userData = (req,res) => {
    const id = req.userId;
    const send = ({ status, body }) => res.status(status).send({ status, body });
    User.findById(id, 'username name email', (err, user) => {
        if(err) send({ status: 500, body: 'Try again' });
        send({ 
            status: 200, 
            body: {
                username: user.username,
                name: user.name,
                email: user.email,
            } 
        });
    });
}

controllers.getData = (req,res) => {
    User.findById(req.userId).populate('posts').exec((err, user) => {
        res.send(user);
    })
}

export default controllers;