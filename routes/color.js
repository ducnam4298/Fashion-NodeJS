const express = require('express');
const router = express.Router();

const Color = require('../models/color.model');
const customTitle = 'Clothing Store';
const authTitle = 'Management Store';

const getListColor = async () => {
  const listColor = await Color.find();
  return listColor;
};

/* GET home page. */
router.get('/', async (req, res, next) => {
  const listColors = await getListColor();
  res.render('color/index', {
    title: authTitle,
    listColors: listColors
  });
});

router.post('/store', async (req, res, next) => {
  const { name } = req.body;
  const color = await Color.find({ name: name });
  if (color.length === 0) {
    await Color.create({
      name,
      created_at: Date.now(),
      updated_at: Date.now()
    });
  };
  res.redirect("/color");
});

router.get('/edit/:color_id', async (req, res, next) => {
  Color.findById(req.params.color_id, (err, color) => {
    if (err) {
      console.log(err);
      throw err
    }
    res.render('color/edit', {
      title: authTitle,
      color: color
    });
  });
});

router.post('/update/:color_id', async (req, res, next) => {
  const { name } = req.body;
  let color_id = req.params.color_id;
  Color.findByIdAndUpdate(
    { _id: color_id },
    { $set: { name: name } },
    { useFindAndModify: false })
    .then(doc => {
      res.redirect("/color");
    });
});

router.post('/delete/:color_id', async (req, res, next) => {
  let color_id = req.params.color_id;
  Color.findByIdAndRemove(color_id, (err, doc) => {
    if (err) throw err;
    res.redirect('/color');
  });
});

module.exports = router;
