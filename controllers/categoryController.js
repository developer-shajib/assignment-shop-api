const { readFileSync, writeFileSync } = require('fs');
const path = require('path');


/**
 * @desc GET All Category DATA
 * @name GET  api/v1/category
 * @access public
 */
const getAllCategory = (req,res)=>{

    //get all category from json data
    const category = JSON.parse(readFileSync(path.join(__dirname,'../db/category.json')));
    res.status(200).json(category);
}


/**
 * @desc Create a Category
 * @name POST  api/v1/category
 * @access public
 */
 const createCategory = (req,res)=>{

    //get category from json db
    const category = JSON.parse(readFileSync(path.join(__dirname,'../db/category.json')));

    // get data form body
    const {name,slug,photo} = req.body;

    if(!name || !slug || !photo){
        res.status(400).send('All fields are required!')
    }
    else{
        //data push
        category.push({
            id : Math.floor(Math.random() * 10000000000).toString(),
            name,slug,photo
        });

    // data push json db
    writeFileSync(path.join(__dirname,'../db/category.json'),JSON.stringify(category))
    res.status(201).send(`Data Created`);
    }

}


/**
 * @desc Get single Category
 * @name GET  api/v1/category/:id
 * @access public
 */
 const getSingleCategory =(req,res)=>{

    //get category from json db
    const category = JSON.parse(readFileSync(path.join(__dirname,'../db/category.json')));

    //find single category
    const categorySingle = category.find(data=>data.id == req.params.id);

    if(categorySingle){
        res.status(200).json(categorySingle);
    }
    else{
        res.status(404).send(`404 Not Found!`)
    }
    
}



/**
 * @desc DELETE CATEGORY DATA
 * @name DELETE  api/v1/category/:id
 * @access public
 */
 const deleteCategory = (req,res)=>{

    //get data from json db
    const category = JSON.parse(readFileSync(path.join(__dirname,'../db/category.json')));


    if(category.some(data=>data.id == req.params.id)){

        // find delete category data 
        const deleteCategoryData = category.filter(data=>data.id != req.params.id);
        writeFileSync(path.join(__dirname,'../db/category.json'),JSON.stringify(deleteCategoryData));
        res.status(201).send(`Category Delete Successfully`);  
    }
    else{
        res.status(404).send(`404 Not Found!`);  
    }
}


//export data
module.exports = {
    getAllCategory,
    createCategory,
    getSingleCategory,
    deleteCategory
}