const express = require('express');
const router = express.Router();

// const User = require('../models/user.model');
const customTitle = 'Clothing Store';
const authTitle = 'Management Store';

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('transporter/index', { title: authTitle });
});

module.exports = router;