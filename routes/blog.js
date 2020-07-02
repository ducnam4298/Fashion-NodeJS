const express = require('express');
const router = express.Router();

const authTitle = 'Management VTC Store';
const customTitle = 'VTC Store'

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('blog/index', { title: 'Clothing Store' });
});

router.get('/', (req, res, next) => {
  res.render('blog/show', { title: 'Clothing Store' });
});

module.exports = router;
