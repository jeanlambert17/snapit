import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = Schema({
    content: String,
    url: String,
    date: Schema.Types.Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Like',
    }]
}, { collection: 'Post' });

let PostModel = mongoose.model('Post', postSchema);

export default PostModel