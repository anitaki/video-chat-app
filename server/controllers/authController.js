const User = require("../modules/userModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
const {username, email, password, picture} = req.body

  try {
    // Check if user has completed all input fields
    if (!username || !email || !password) {
      res.send({ message: "Please complete all the fields" });
    } else {
      // Check if user already exists in the DB
      let user = await User.findOne({ email });
      if (user) {
        res.send({ message: "The user already exist" });
      } else {
        // Create salt and hash
        bcrypt.hash(password, 10, async (err, hash) => {
          if (hash) {
            let newUser = new User({
              username,
              email,
              picture,
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
const {username, email, password} = req.body
  // find the user and check the password against the database
  try {
    var user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
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

const getUsers = async (req, res) => {
  try{
var allUsers = await User.find({});
res.send(allUsers)
} catch (error) {
  res.status(500).json(error);
}
}

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  getUsers,
};
