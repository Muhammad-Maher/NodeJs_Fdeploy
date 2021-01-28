const express = require('express');
require('./db_connection');

const todoRouter = require('./routers/todo');
const postRouter = require('./routers/post');

const userRouter = require('./routers/user');


const app = express();



app.use(express.static('public'));
app.use(express.json());



app.use('/api/todo', todoRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

app.listen(3000, () => {
    console.info('server listening on poset 3000')
})
