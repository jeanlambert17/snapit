import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = Schema({
    imageUrl: String,
    figthers: [String],
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Schema.Types.Date,
        required: true,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    votes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vote',
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Like',
    }]
}, { collection: 'Post' });

let PostModel = mongoose.model('Post', postSchema);

export default PostModel