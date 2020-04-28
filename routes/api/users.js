const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ email: 'Email already exists' });
  }

  try {
    const newUser = {
      name,
      email,
      password,
    };

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    newUser.password = hashPassword;

    const user = new User(newUser);

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.error(error);
  }
});

//@route POST api/users/login
// @desc login user
// @access Public
router.post('/login', async (req, res) => {
  console.log('muggi');
  console.log(req.body);
  const { email, password } = req.body;
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find the user
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) return res.status(400).send('Email or password does not exists');

  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password!');

  //create payload
  const payload = {
    id: user._id,
    name: user.name,
  };
  //Create and assign a token
  jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
    res.json({
      success: true,
      token: 'Bearer ' + token,
      name: user.name,
    });
  });
});

module.exports = router;
