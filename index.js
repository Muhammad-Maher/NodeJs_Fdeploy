const express = require('express');
require('./db_connection');

const todoRouter = require('./routers/todo');
const postRouter = require('./routers/post');

const userRouter = require('./routers/user');
const RequestLog = require('./models/requestLog');



const app = express();



app.use((req, res, next) => {
    const  request_url  =req.originalUrl;
    const { method } = req;    
    RequestLog.create({  request_url, method }, (err, request) => {

        if (err) {


            return res.send('something went wrong');

        }
        next();
    })
})

app.use(express.static('public'));
app.use(express.json());

app.use('/api/todo', todoRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

app.use((req, res, next) => {
    res.statusCode= 500;
    res.send({ error: "internal server error" });
})

app.listen(process.env.PORT || 3000, () => {
    console.info('server listening on poset 3000')
})
