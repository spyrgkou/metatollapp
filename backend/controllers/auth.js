const User = require("../models/users");
const createToken = require("../helpers").createToken;
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redisConfig");
const ExpressError = require("../errorHandler");

module.exports.signup = async (req, res, next) => {
  const { username, password, role, name, abbrevation, email } = req.body;
  try {
    const user = await User.create({
      username,
      password,
      role,
      name,
      abbrevation,
      email,
    });
    const token = await createToken(user._id, user.name, user.role);
    res.status(201).json({
      user: user._id,
      name: user.name,
      role: user.role,
      token: token,
    });
  } catch (error) {
    next(new ExpressError(error.message, 500));
  }
};

module.exports.login_get = (req, res, next) => {
  res.send("loginget");
};

module.exports.login_post = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    if (user) {
      await createToken(user._id).then(async (token) => {
        await redisClient.SET(user.username, token);
        res.status(200).json({
          user: user._id,
          token: token,
        });
      });
    } else {
      next(new ExpressError("Login not succesful", 400));
    }
  } catch (error) {
    next(new ExpressError(error.message, 400));
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const token = req.header("X-OBSERVATORY-AUTH");
    if (!token) {
      next(new ExpressError("No user is logged in!", 402));
    }
    if (await redisClient.lPos("blacklisted_tokens", token)) {
      next(
        new ExpressError("User with this token logged out. Log in again.", 401)
      );
    }
    await redisClient.rPush("blacklisted_tokens", token).then(async () => {
      await redisClient.del(jwt.decode(token).userInfo.name);
      res.status(200).send("User Logged Out Successfully!");
    });
  } catch (error) {
    next(new ExpressError(error.message, 500));
  }
};
