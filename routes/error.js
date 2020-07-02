const express = require('express');
const router = express.Router();

const authTitle = 'Management VTC Store';
const customTitle = 'VTC Store'

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('error/index', { title: authTitle });
});


module.exports = router;
