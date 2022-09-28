const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');


/**
 * @desc GET All Customer DATA
 * @name GET  api/v1/customer
 * @access public
 */
const getAllCustomer = (req,res)=>{

    //get all customer from json data
    const customer = JSON.parse(readFileSync(path.join(__dirname,'../db/customer.json')));
    res.status(200).json(customer);
}

/**
 * @desc Create a Customer
 * @name POST  api/v1/customer
 * @access public
 */
const createUser = (req,res)=>{

    //create a customer from json db
    const customer = JSON.parse(readFileSync(path.join(__dirname,'../db/customer.json')));

    // get data from body
    const {name,email,cell,location,zip,shippingAddress,billingAddress} = req.body;

    if(!name || !email || !cell || !location || !zip || !shippingAddress || !billingAddress){
        res.status(400).send('All fields are required!')
    }
    else{
            //data push
    customer.push({
        id : Math.floor(Math.random() * 10000000000).toString(),
        name,email,cell,location,zip,shippingAddress,billingAddress
    });

    // data push json db
    writeFileSync(path.join(__dirname,'../db/customer.json'),JSON.stringify(customer))
    res.status(201).send(`Data Created`);
    }

}


/**
 * @desc See customer single details
 * @name GET  api/v1/customer/:id
 * @access public
 */
const getSingleUser =(req,res)=>{

    //create a customer from json db
    const customer = JSON.parse(readFileSync(path.join(__dirname,'../db/customer.json')));

    //find single customer
    const customerSingle = customer.find(data=>data.id == req.params.id);

    if(customerSingle){
        res.status(200).json(customerSingle);
    }
    else{
        res.status(404).send(`404 Not Found!`)
    }
    
}

/**
 * @desc DELETE CUSTOMER DATA
 * @name DELETE  api/v1/customer/:id
 * @access public
 */
const deleteCustomer = (req,res)=>{

    //create a customer from json db
    const customer = JSON.parse(readFileSync(path.join(__dirname,'../db/customer.json')));


    if(customer.some(data=>data.id == req.params.id)){

        // find delete customer data 
        const deleteCustomerData = customer.filter(data=>data.id != req.params.id);
        writeFileSync(path.join(__dirname,'../db/customer.json'),JSON.stringify(deleteCustomerData));
        res.status(201).send(`Data Delete Successfully`);  
    }
    else{
        res.status(404).send(`404 Not Found!`);  
    }
}

/**
 * @desc UPDATE CUSTOMER DATA
 * @name PUT/PATCH  api/v1/customer/:id
 * @access public
 */
const updateCustomerData = (req,res)=>{

    //create a customer from json db
    const customer = JSON.parse(readFileSync(path.join(__dirname,'../db/customer.json')));

    if(customer.some(data=>data.id == req.params.id)){
        // update customer data
        customer[customer.findIndex(data=>data.id == req.params.id)] ={
            ...customer[customer.findIndex(data=>data.id == req.params.id)],
            ...req.body
        }
        writeFileSync(path.join(__dirname,'../db/customer.json'),JSON.stringify(customer));
        res.status(201).send(`Data Update Successfully.`)
    }
    else{
        res.status(400).send(`Bad Request!.`)
    }
}

//module export
module.exports = {
    getAllCustomer,
    createUser,
    getSingleUser,
    deleteCustomer,
    updateCustomerData
}