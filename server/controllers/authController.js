const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const verifyToken = require('./verifyToken');

const User = require('../models/User');

router.post('/register', async (req, res, next) => {
  const { email, password, full_name } = req.body;
  const newUser = new User({
    email,
    password,
    full_name,
  });
  newUser.password = await newUser.encryptPassword(newUser.password);
  await newUser.save();
  const id = newUser._id;
  const token = jwt.sign({ id: newUser._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  res.json({ auth: true, token, email, id });

});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json("The email doesn't exist");
  }
  const passwordIsValid = await user.validatePassword(password);
  if (!passwordIsValid) {
    return res.status(404).status({ auth: false, token: null });
  }
  const id = user._id;
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  res.json({ auth: true, token, message: 'login', id });
});

router.get('/user', verifyToken, async (req, res, next) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status('404').send('No user found');
  }
  console.log('Youre in the dashboard');
  res.json(user);
});

module.exports = router;
