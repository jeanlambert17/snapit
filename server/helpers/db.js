import Mongoose from 'mongoose'
import configs from './configs'

async function connectToDb() {

    try {
        await Mongoose.connect(configs.url);
        console.log('Connected to MongoDB!');
    } catch(err) {
        console.log(err)
        console.log('Could no connect to MongoDB');
    }

}

export default connectToDb