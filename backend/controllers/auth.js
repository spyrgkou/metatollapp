const User = require('../models/users');
const createToken = require('../helpers').createToken
const jwt = require('jsonwebtoken');

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
    catch(err){
        res.status(500).send(err.message);
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
            res.status(400).json({ message: "Login not succesful" });
        }
    }
    catch(err){
        res.status(400).json({errormessage: err.message});
    }
}

module.exports.logout = (req, res) => {
    const {username, password} = req.body;
    res.send('logout');
}
