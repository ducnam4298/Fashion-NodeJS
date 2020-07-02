const express = require('express');
const router = express.Router();

const Category = require('../models/category.model');
const customTitle = 'Clothing Store';
const authTitle = 'Management Store';

const getCategories = async () => {
  const list = await Category.find();
  return list;
};

/* GET home page. */
router.get('/', async (req, res, next) => {
  const categories = await getCategories();
  res.render('category/index', {
    title: authTitle,
    categories: categories
  });
});

router.post('/store', async (req, res, next) => {
  const { name } = req.body;
  const state = 'active';
  const category = await Category.find({ name: name });
  if (category.length === 0) {
    await Category.create({
      name,
      state,
      created_at: Date.now(),
      updated_at: Date.now()
    });
  };
  res.redirect("/category/");
});

router.get('/edit/:category_id', async (req, res, next) => {
  await Category.findById(req.params.category_id, (err, category) => {
    if (err) {
      console.log(err);
      throw err
    }
    res.render('category/edit', {
      title: authTitle,
      category: category
    });
  });
});

router.post('/update/:category_id', async (req, res, next) => {
  const { name } = req.body;
  let category_id = req.params.category_id;
  await Category.findByIdAndUpdate(
    { _id: category_id },
    { $set: { name: name, updated_at: Date.now() } },
    { useFindAndModify: false })
    .then(doc => {
      res.redirect("/category");
    });
});

router.post('/active/:category_id', async (req, res, next) => {
  // const { state } = req.body;
  const state = 'active';
  let category_id = req.params.category_id;
  await Category.findByIdAndUpdate(
    { _id: category_id },
    { $set: { state: state, updated_at: Date.now() } },
    { useFindAndModify: false })
    .then(doc => {
      res.redirect("/category");
    });
});

router.post('/hidden/:category_id', async (req, res, next) => {
  // const { state } = req.body;
  const state = 'hidden';
  let category_id = req.params.category_id;
  await Category.findByIdAndUpdate(
    { _id: category_id },
    { $set: { state: state, updated_at: Date.now() } },
    { useFindAndModify: false })
    .then(doc => {
      res.redirect("/category");
    });
});

module.exports = router;
