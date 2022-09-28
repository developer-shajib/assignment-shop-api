const express = require('express');
const { getAllCustomer, createUser, getSingleUser, deleteCustomer, updateCustomerData } = require('../controllers/customerController');

//init router
const router = express.Router();

//create router
router.route('/').get(getAllCustomer).post(createUser);
router.route('/:id').get(getSingleUser).delete(deleteCustomer).put(updateCustomerData).patch(updateCustomerData);


module.exports = router;