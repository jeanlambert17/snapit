import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
}, { collection: 'user' });

let UserModel = mongoose.model('User', userSchema);

export default UserModel