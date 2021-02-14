const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User');

router.post('/signup', async (req, res, next) => {
  const { email, password, full_name } = req.body;
  const user = new User({
    email,
    password,
    full_name,
  });
  user.password = await user.encryptPassword(user.password);

  await user.save;
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  res.json({ auth: true, token });
});

router.post('/login', (req, res, next) => {});

router.get('/dashboard', async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token provided',
    });
  }
  const decoded = jwt.verify(token, config.secret);

  const user = await User.findById(decoded.id, {password:0});
  if (!user) {
    return res.status('404').send('No user found');
  }
  res.json(user);
});

module.exports = router;
