const express = require('express');
const { getAllProduct, createProduct, getSingleProduct, deleteProduct, updateProductData } = require('../controllers/productController');
const shopImgMulter = require('../middlewares/shopImageMulter');

//init router
const router = express.Router();

//create router
router.route('/').get(getAllProduct).post(createProduct);
router.route('/:id').get(getSingleProduct).delete(deleteProduct).put(updateProductData).patch(updateProductData);


module.exports = router;