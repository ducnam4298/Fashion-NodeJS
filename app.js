require('./models/db');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/category');
const colorRouter = require('./routes/color');
const orderRouter = require('./routes/order');
const productRouter = require('./routes/product');
const transporterRouter = require('./routes/transporter');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const contactRouter = require('./routes/contact');
// const errorRouter = require('./routes/error');
const otherRouter = require('./routes/other');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/color', colorRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);
app.use('/transporter', transporterRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/contact', contactRouter);
// app.use('/error', errorRouter);
app.use('/other', otherRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
