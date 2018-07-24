import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const likeSchema = Schema({
  state: {
    type: Schema.Types.Boolean,
    required: true
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
  }
}, { collection: 'like' });

let LikeModel = mongoose.model('Like', likeSchema);

export default LikeModel