const express = require('express');
const router = express.Router();

const authTitle = 'Management VTC Store';
const customTitle = 'VTC Store'

/* GET home page. */
router.get('/', async(req, res, next) => {
  res.render('home/index', { 
    title: customTitle,
  });
});

module.exports = router;
