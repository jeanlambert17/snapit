import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const likeSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }
}, { collection: 'Like' });

let LikeModel = mongoose.model('Like', likeSchema);

export default LikeModel