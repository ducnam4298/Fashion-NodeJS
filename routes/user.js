const express = require('express');
const router = express.Router();

const User = require('../models/user.model');
const authTitle = 'Management VTC Store';
const customTitle = 'VTC Store'

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('user/index', { title: authTitle });
});

// router.get('/profile', (req, res, next) => {
//   res.render('user/profile', { title: 'Management Store' });
// });

// router.get('/login', (req, res, next) => {
//   res.render('user/login', { title: 'Clothing Store' });
// });

module.exports = router;