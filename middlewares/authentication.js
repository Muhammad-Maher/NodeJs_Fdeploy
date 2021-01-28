
const jwt=require('jsonwebtoken')
module.exports=(req, res, next) => {
    try {
        const { authorization } = req.headers;
        const signData = jwt.verify(authorization, "secret-key");
        req.signData = signData;
        next();
    } catch (err) {
        console.error(err);
        res.statusCode = 401;
        res.json({ success: false, message: "authorization failed" })
    }

}