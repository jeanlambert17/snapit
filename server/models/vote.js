import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const voteSchema = Schema({
    index: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }
}, { collection: 'Like' });

let VoteModel = mongoose.model('Vote', voteSchema);

export default VoteModel