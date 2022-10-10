const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisConfig')
const ExpressError = require('../errorHandler')

module.exports = async (req, res, next) => {
    try{
        const token = req.header('X-OBSERVATORY-AUTH');
        if (!token){
            // res.status(402).send("Authentication Failed");
            next(new ExpressError ('Authentication Failed', 402));
        }
        if (await redisClient.lPos('blacklisted_tokens',token)){
            // res.status(401).json({message: 'User with this token logged out. Log in again.'});
            next(new ExpressError ('User with this token logged out. Log in again.', 401));
        } else {
            const decodedToken = jwt.verify(token, 'programming grinding');
            req.userData = { 
                userId: decodedToken.userInfo.id, 
                userName: decodedToken.userInfo.name, 
                userRole: decodedToken.userInfo.role 
            };
            next();
        }
    } catch(error){
        // return next(error);
        return next(new ExpressError (error.message, 500));
    }
}