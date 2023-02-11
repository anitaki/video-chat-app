const User = require("../modules/userModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    // Check if user has completed all input fields
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.send({ message: "Please complete all the fields" });
    } else {
      // Check if user already exists in the DB
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.send({ message: "The user already exist" });
      } else {
        // Create salt and hash
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (hash) {
            let newUser = new User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
            });

            // Save the user
            await newUser.save();
            res.send({ message: true });
          } else {
            console.log(err);
            res.send({ message: false });
          }
        });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  // find the user and check the password against the database
  try {
    var user = await User.findOne({ username: req.body.username });
    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          var token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
            expiresIn: process.env.TOKEN_EXPIRES_IN,
          });
          res.send({ token });
        } else {
          res.send({ message: "Wrong password" });
        }
      });
    } else {
      res.send({ message: "Wrong username" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const verifyUser = async (req, res) => {
  // check for a valid token and return the user data
  try {
    jwt.verify(req.body.token, process.env.TOKEN_KEY, async (err, payload) => {
      if (payload) {
        var user = await User.findOne({ _id: payload.id });
        res.send(user);
      } else {
        res.send({ message: "Session expired" });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
};
