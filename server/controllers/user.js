import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import configs from '../helpers/configs'
import { User } from '../models'

let controllers = {}

controllers.signUp = (req,res) => {
	let { name, username, email, password } = req.body;
	let hash = bcrypt.hashSync(password, 10);
	const send = ({ status, body, ...rest }) => res.status(status).send({ status, body, ...rest });
	
	User.create({
		name: name,
		email: email,
		username: username,
		password: hash,
	}, (err, user) => {
		console.log('USER_signup: ');
		console.log(user);
		if (err) send({status: 500, body: 'Try again'});
		if (user) send({
			status: 200,
			body: userData(user)
		});
	});

}
controllers.logIn = (req,res) => {
	const { username, password } = req.body;
	const send = ({status,body, ...rest}) => res.status(status).send({status,body, ...rest});
	Promise.all([User.findOne({ 'username': username }), User.findOne({ 'email': username })])
	.then( async ([username,email]) => {
		const user = username ? username : email;
		if(user) {
			try {
				let isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch) send({ status: 401, body: 'Invalid credentials' });
				else {
					let token = jwt.sign({ id: user._id }, configs.secret, { expiresIn: 86400 }); // 24 hours
					console.log('User login: ');
					console.log(user);
					send({
						status: 200,
						body: {
							user: userData(user),
							token,
						}
					});
				}
			} catch (err) {
				console.log(err);
				send({ status: 500, body: 'Try again' });
			}
		} else 
			send({ status: 401, body: 'Username or email doesn\'t exist'})
	}).catch(err => {
		send({status: 500, body: err.message || 'Try again'});
	})
}

controllers.updatePassword = (req,res) => {
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

controllers.updateField = (req,res) => {
	const { password, username, email, name } = req.body;
	const id = req.userId;
	const send = ({ status, body }) => res.status(status).send({ status, body });

	User.findById(id, async (err, user) => {
		if (err) send({ status: 500, body: 'Try again 1' });
		if (!user) send({ status: 500, body: 'Unable to reach user data' });
		try {
			let isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				user.username = username;
				user.email = email;
				user.name = name;
				user.save((err,updatedUser) => {
					if (err) send({ status: 500, body: 'Try again 2' });
					if (updatedUser) send({
						status: 200,
						body: userData(user)
					});
				})
			} else send({ status: 401, body: 'Invalid credentials' });
		} catch (err) {
			console.log('catch err: ' + err);
			send({ status: 500, body: 'Try again' });
		}
	});
}

controllers.updatePhotoUrl = (req,res) => {
	const id = req.userId;
	const send = ({ status, body }) => res.status(status).send({ status, body });
	const path = req.file.path.split('public\\')[1];
	console.log(path);
	User.findById(id, (err,user) => {
		if(err) send({ status:500, body: err.message || 'Error updating user photo'});
		if(!user) send({ status:401, body:'Unable to reach user data' });
		else {
			user.photoUrl = path;
			user.save((err,updatedUser) => {
				if (err) send({ status: 500, body: err.message || 'Error updating user photo' });
				if(updatedUser) send({
					status: 200,
					body: userData(updatedUser),
				});
			});
		}
	});
}

controllers.userPosts = (req,res) => {
	const id = req.userId;
	const send = (status,body) => res.status(status).send({ status, body });
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
	})
}

controllers.userData = (req,res) => {
	const id = req.userId;
	const send = ({ status, body }) => res.status(status).send({ status, body });
	User.findById(id, 'username name email photoUrl', (err, user) => {
		if(err) send({ status: 500, body: 'Try again' });
		if (user) send({
			status: 200,
			body: userData(user)
		});
	});
}

export default controllers;

// Helpers
const userData = (user) => ({
	username: user.username,
	email: user.email,
	photoUrl: `${process.env.API_URL}/${user.photoUrl}`,
	name: user.name,
});
const existField = (key,value) => {
	User.findOne({ [key]: value }, key, async (err, user) => {
		if (err) 
			throw err;
		if (user) 
			return false
		else 
			return true
	});
}