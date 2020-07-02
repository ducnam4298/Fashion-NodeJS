const express = require('express');
const { render } = require('pug');
const router = express.Router();

const Order = require('../models/order.model');
const customTitle = 'Clothing Store';
const authTitle = 'Management Store';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('order/index', { title: 'Clothing Store' });
});

router.get('/order-detail', (req, res, next) => {
  res.render('order/order-detail', { title: 'Clothing Store' });
});

router.get('/shopping-cart', (req, res, next) => {
  res.render('order/shopping-cart', { title: 'Clothing Store' });
});


module.exports = router;
