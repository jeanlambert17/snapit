import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = Schema({
    description: String,
    imageUrl: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, { collection: 'Post' });

export default moongose.model('Post', postSchema);