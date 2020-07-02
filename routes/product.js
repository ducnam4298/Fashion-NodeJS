const express = require('express');
const multer = require('multer');
const router = express.Router();

const Product = require('../models/product.model');
const Category = require('../models/category.model');

const authTitle = 'Management VTC Store';
const customTitle = 'VTC Store'

const getProducts = async () => {
  const list = await Product.find();
  return list;
};

const getCategories = async () => {
  const list = await Category.find();
  return list;
};

/* GET home page. */
router.get('/index', async (req, res, next) => {
  const products = await getProducts();
  const categories = await getCategories();
  res.render('product/index', {
    title: authTitle,
    products: products,
    categories: categories
  });
});

router.get('/', async (req, res, next) => {
  const products = await getProducts();
  res.render('product/product', {
    title: customTitle,
    products: products
  });
});

router.get('/product-detail', (req, res, next) => {
  res.render('product/product-detail', { title: customTitle });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false, new Error('Image uploaded is not of type jpg/jpeg or png'));
  }
};

const upload = multer({ storage, fileFilter });

router.post('/store', upload.array('image', 12), async (req, res, next) => {
  const image = [];
  const details = [];
  const state = 'active';
  const {
    name,
    category,
    color,
    size,
    quantity,
    gender,
    price,
    description
  } = req.body;
  // res.send(req.body);
  // const dir = '\upload\';
  // res.send(req.files);

  for (const path of req.files) {
    image.push('/uploads/' + path.filename);
  }

  const product = await Product.find({ name: name });

  if (Array.isArray(color, size, quantity)) {
    for (let i = 0; i < color.length, i < size.length, i < quantity.length; i++) {
      details.push({
        color: color[i].toUpperCase(),
        size: size[i],
        quantity: quantity[i],
      });
    }
  } else {
    details.push({
      color: color.toUpperCase(),
      size: size,
      quantity: quantity,
    });
  }
  if (product.length === 0) {
    await Product.create({
      name,
      category,
      details,
      gender,
      price,
      description,
      image,
      state
    });
  }
  res.redirect("/product/index");
});

router.get('/edit/:product_id', async (req, res, next) => {
  const product = await Product.findById(req.params.product_id);

  res.render('product/edit', {
    title: authTitle,
    product: product
  });

  // res.send('ERR');
  // await Product.findById(req.params.product_id, (err, product) => {
  // console.log(err);
  // if (err) {
  //   console.log(err);
  //   throw err
  // }
  // 
  // });
});

router.post('/active/:product_id', async (req, res, next) => {
  const state = 'active';
  let product_id = req.params.product_id;
  await Product.findByIdAndUpdate(
    { _id: product_id },
    { $set: { state: state, updated_at: Date.now() } },
    { useFindAndModify: false })
    .then(doc => {
      res.redirect("/product");
    });
});

router.post('/hidden/:product_id', async (req, res, next) => {
  const state = 'hidden';
  let product_id = req.params.product_id;
  await Product.findByIdAndUpdate(
    { _id: product_id },
    { $set: { state: state, updated_at: Date.now() } },
    { useFindAndModify: false })
    .then(doc => {
      res.redirect("/product");
    });
});

router.post('/delete/:product_id', async (req, res, next) => {
  const product_id = req.params.product_id;
  await Product.findByIdAndRemove(product_id, (err, doc) => {
    if (err) throw err;
    res.redirect('/product/index');
  });
});

module.exports = router;
