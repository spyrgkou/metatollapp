const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.header('X-OBSERVATORY-AUTH');
        if (!token){
            res.status(402).send("Authentication Failed");
        }
        const decodedToken = jwt.verify(token, 'programming grinding');
        req.userData = { 
            userId: decodedToken.userInfo.id, 
            userName: decodedToken.userInfo.name, 
            userRole: decodedToken.userInfo.role 
        };
        // console.log(req.userData);
        // console.log(decodedToken);
        next();
    } catch(err){
        return next(err);
    }
}