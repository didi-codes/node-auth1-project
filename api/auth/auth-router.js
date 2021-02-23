const express = require('express');
const router = express.Router();
const User = require('../users/users-model.js');
const bcrypt = require('bcryptjs');

router.post('/register', checkPayload, checkUserInDb, async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.username,
      password: hash,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', checkPayload, checkUserExists, (req, res) => {
  try {
    const verified = bcrypt.compareSync(
      req.body.password,
      req.userData.password
    );
    if (verified) {
      req.session.user = req.userData;
      res.json(`Welcome back ${req.userData.username}`);
    } else {
      res.status(401).json('Username or password are incorrect');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.json('Cannot Log Out');
      } else {
        res.json('Logged Out');
      }
    });
  } else {
    res.json('No Session');
  }
});

module.exports = router;
