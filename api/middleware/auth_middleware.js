const User = require('../users/users-model');

module.exports = {
  checkPayload,
  checkUserInDb,
  checkUserExists,
};

const checkPayload = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json('Username or password missing');
  } else {
    next();
  }
};

const checkUserInDb = async (req, res, next) => {
  try {
    const rows = await User.getBy({ username: req.body.username });
    if (!rows.length) {
      next();
    } else {
      res.status(401).json('Username already exists');
    }
  } catch (error) {
    res.status(500).json(`Server error: ${error}`);
  }
};

const checkUserExists = async (req, res, next) => {
  try {
    const rows = await User.getBy({ username: req.body.username });
    if (rows.length) {
      req.userData = rows[0];
      next();
    } else {
      res.status(401).json('Login error, check credentials');
    }
  } catch (error) {
    res.status(500).json(`Server error: ${error}`);
  }
};

