const express = require('express');
const router = express.Router();

const authTitle = 'Management VTC Store';
const customTitle = 'VTC Store'

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('other/index', { title: customTitle });
});

router.get('/about', (req, res, next) => {
  res.render('other/about', { title: customTitle });
});

module.exports = router;
