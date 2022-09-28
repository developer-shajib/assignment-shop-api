const { readFileSync, writeFileSync } = require('fs');
const path = require('path');


/**
 * @desc GET All Product DATA
 * @name GET  api/v1/product
 * @access public
 */
const getAllProduct = (req,res)=>{

    //get all product from json data
    const product = JSON.parse(readFileSync(path.join(__dirname,'../db/product.json')));
    res.status(200).json(product);
}


/**
 * @desc Create a Product
 * @name POST  api/v1/product
 * @access public
 */
 const createProduct = (req,res)=>{

    //create a product from json db
    const product = JSON.parse(readFileSync(path.join(__dirname,'../db/product.json')));

    // get data form body
    const {name,slug,regular_price,sale_price,stock,short_desc,long_desc,category,tag} = req.body;

    if(!name || !slug || !regular_price || !sale_price || !stock || !short_desc || !long_desc || !category || !tag){
        res.status(400).send('All fields are required!')
    }
    else{
        //data push
        product.push({
            id : Math.floor(Math.random() * 10000000000).toString(),
            name,slug,regular_price,sale_price,stock,short_desc,long_desc,category,tag
        });

    // data push json db
    writeFileSync(path.join(__dirname,'../db/product.json'),JSON.stringify(product))
    res.status(201).send(`Data Created`);
    }

}




/**
 * @desc Get single Product
 * @name GET  api/v1/product/:id
 * @access public
 */
 const getSingleProduct =(req,res)=>{

    //create a product from json db
    const product = JSON.parse(readFileSync(path.join(__dirname,'../db/product.json')));

    //find single product
    const productSingle = product.find(data=>data.id == req.params.id);

    if(productSingle){
        res.status(200).json(productSingle);
    }
    else{
        res.status(404).send(`404 Not Found!`)
    }
    
}


/**
 * @desc DELETE PRODUCT DATA
 * @name DELETE  api/v1/product/:id
 * @access public
 */
 const deleteProduct = (req,res)=>{

    //get data from json db
    const product = JSON.parse(readFileSync(path.join(__dirname,'../db/product.json')));


    if(product.some(data=>data.id == req.params.id)){

        // find delete product data 
        const deleteProductData = product.filter(data=>data.id != req.params.id);
        writeFileSync(path.join(__dirname,'../db/product.json'),JSON.stringify(deleteProductData));
        res.status(201).send(`Data Delete Successfully`);  
    }
    else{
        res.status(404).send(`404 Not Found!`);  
    }
}


/**
 * @desc UPDATE PRODUCT DATA
 * @name PUT/PATCH  api/v1/product/:id
 * @access public
 */
 const updateProductData = (req,res)=>{

    //get product from json db
    const product = JSON.parse(readFileSync(path.join(__dirname,'../db/product.json')));

    if(product.some(data=>data.id == req.params.id)){
        // update product data
        product[product.findIndex(data=>data.id == req.params.id)] ={
            ...product[product.findIndex(data=>data.id == req.params.id)],
            ...req.body
        }
        writeFileSync(path.join(__dirname,'../db/product.json'),JSON.stringify(product));
        res.status(201).send(`Data Update Successfully.`)
    }
    else{
        res.status(400).send(`Bad Request!.`)
    }
}


//export data
module.exports = {
    getAllProduct,
    createProduct,
    getSingleProduct,
    deleteProduct,
    updateProductData
}