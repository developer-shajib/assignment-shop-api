const express = require('express');
const { getAllCategory, createCategory, deleteCategory, getSingleCategory } = require('../controllers/categoryController');

//init router
const router = express.Router();

//create router
router.route('/').get(getAllCategory).post(createCategory);
router.route('/:id').get(getSingleCategory).delete(deleteCategory)


module.exports = router;