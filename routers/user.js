const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const  jwt = require('jsonwebtoken');
const authinticationMiddleware = require('../middlewares/authentication');
const { Error } = require('mongoose');
//BASE PATH  /api/user
const userRouter = new express.Router();









userRouter.post('/', body('password').isLength({ min: 5 }), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hash });
        res.statusCode = 201;
        res.send(user);
    }
    catch (err) {
        console.error(err);
        res.statusCode = 422;
        res.send(err);
    }

});

userRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).exec();
        if (!user) throw new Error("wrong username or password");
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) throw new Error("wrong username or password");


        const token = jwt.sign({ id: user.id }, "secret-key")
        res.json({ token })
    }
    catch (err) {
        res.statusCode = 422;
        res.json({ success: false, message: err.message });
    }
})




userRouter.get('/', (req, res) => {
    User.find({}, { password: 0 }, (err, users) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.send({ message: "somthing went wrong" })
        }
        res.send(users);
    })
})

// userRouter.use(authinticationMiddleware)

userRouter.get('/profile', authinticationMiddleware,async (req, res) => {

    const userData = await User.findOne({ _id: req.signData.id }, { password: 0 })
    res.send(userData);

})



userRouter.get("/my-inbox", (req, res) => {

})


module.exports = userRouter;