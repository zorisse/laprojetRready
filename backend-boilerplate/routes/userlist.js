const express = require('express');
const User = require('../models/user-model');
const router = express.Router();

/* GET home page */
router.get('/userList', (req, res, next) => {
  User.find({})
    .then(users =>
      res.json(users)
    )


});

module.exports = router;
