import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = Schema({
    content: {
        required: true,
        type: String,
    },
    date: {
        required: true,
        type: Schema.Types.Date,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
}, { collection: 'comment' });

let CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel