import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tagSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }]
}, { collection: 'tag' });

let TagModel = mongoose.model('Tag', tagSchema);

export default TagModel