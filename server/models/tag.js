import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tagSchema = Schema({
    name: string
}, { collection: 'Like' });

let TagModel = mongoose.model('Tag', tagSchema);

export default TagModel