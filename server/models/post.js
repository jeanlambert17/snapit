import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = Schema({
    imageUrl: {
        required: true,
        type: String,
    },
    // figthers: [String],
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
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Like',
    }]
}, { collection: 'post' });

let PostModel = mongoose.model('Post', postSchema);

export default PostModel