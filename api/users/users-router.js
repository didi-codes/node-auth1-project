const router = require('express').Router();

const Users = require('./users-model');

router.get('/', (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.send(error));
});

module.exports = router;
