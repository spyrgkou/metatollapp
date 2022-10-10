const User = require('../models/users');
const createToken = require('../helpers').createToken
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisConfig')

module.exports.signup = async (req, res) => {
    const {username, password, role, name, abbrevation, email} = req.body;
    try{
        const user = await User.create({ username, password, role, name, abbrevation, email });
        const token = await createToken(user._id, user.name, user.role);
        res.status(201).json({
            user: user._id,
            name: user.name,
            role: user.role,
            token: token
        });
    }
    catch(error){
        // res.status(500).send(err.message);
        next(new ExpressError(error.message, 500));
    }
}

module.exports.login_get = (req, res) => {
    res.send('loginget');
}

module.exports.login_post = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.login(username, password);
        if (user){
            res.status(200).json({
                user: user._id,
                token: await createToken(user._id) 
            });
        } else {
            // res.status(400).json({ message: "Login not succesful" });
            next(new ExpressError("Login not succesful", 400));
        }
    }
    catch(error){
        // res.status(400).json({errormessage: err.message});
        next(new ExpressError(error.message, 400));
    }
}

module.exports.logout = async (req, res) => {
    try{
        const token = req.header('X-OBSERVATORY-AUTH');
        // if (!token){ res.status(402).send("No user is logged in!"); }
        if (!token){ next(new ExpressError("No user is logged in!", 402)); }
        await redisClient.rPush('blacklisted_tokens', token);
        res.status(200).send('User Logged Out Successfully!');
    } catch (error){
        // res.status(500).send(error.message);
        next(new ExpressError(error.message, 500));
    }
}
