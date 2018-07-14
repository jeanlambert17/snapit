import express from 'express';
import connectToDb from './helpers/db';
import routes from './routes';
import path from 'path';

// Const
const app = express();

// Connecting to MongoDB
connectToDb();

// 
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use('/', routes);
app.use(express.static('public'));

app.listen(10036, () => {
    console.log('Example app listening on port 10036');
});