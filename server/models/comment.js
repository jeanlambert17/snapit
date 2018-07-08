import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = Schema({
    content: String,
    date: Schema.Types.Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
}, { collection: 'comment' });

let CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel