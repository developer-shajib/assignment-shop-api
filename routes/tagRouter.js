const express = require('express');
const { getAllTag, createTag, deleteTag } = require('../controllers/tagController');

//init router
const router = express.Router();

//create router
router.route('/').get(getAllTag).post(createTag);
router.route('/:id').delete(deleteTag)


module.exports = router;