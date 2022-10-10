// const ISODateFromString = inputStr => new Date(inputStr.slice(0,4)+"-"+inputStr.slice(4,6)+"-"+inputStr.slice(6));
// const ISODateFromString = inputStr => new Date(inputStr.slice(0,4),inputStr.slice(4,6)-1,inputStr.slice(6));
// const ISODateFromString = inputStr => new Date(inputStr.slice(0,4)+"/"+inputStr.slice(4,6)+"/"+inputStr.slice(6));

const ISODateFromString = inputStr => new Date(inputStr.slice(0,4),inputStr.slice(4,6),inputStr.slice(6)).toISOString();
module.exports.ISODateFromString = ISODateFromString;

const inputCSVDateCorrection = (inputStr) => {
    let temp = inputStr.split(" ");
    let tempdate = temp[0].split("/");
    return new Date(tempdate[1]+"/"+tempdate[0]+"/"+tempdate[2]+" "+temp[1]).toISOString();
}
module.exports.inputCSVDateCorrection = inputCSVDateCorrection;

const User = require('./models/users');
const jwt = require('jsonwebtoken');
const maxAge = 60*60;
const createToken = async (id) => {
    console.log(User.findById(id).name);
    return jwt.sign({ 
        userInfo: {
            id: id,
            name: (await User.findById(id)).name,
            role: (await User.findById(id)).role
            }
        }, 
        'programming grinding',
        { expiresIn: maxAge}
    );
}
module.exports.createToken = createToken;