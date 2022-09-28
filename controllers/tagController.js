const { readFileSync, writeFileSync } = require('fs');
const path = require('path');


/**
 * @desc GET All TAG DATA
 * @name GET  api/v1/tag
 * @access public
 */
const getAllTag = (req,res)=>{

    //get all TAG from json data
    const tag = JSON.parse(readFileSync(path.join(__dirname,'../db/tag.json')));
    res.status(200).json(tag);
}


/**
 * @desc Create a TAG
 * @name POST  api/v1/tag
 * @access public
 */
 const createTag = (req,res)=>{

    //create a Tag from json db
    const tag = JSON.parse(readFileSync(path.join(__dirname,'../db/tag.json')));

    // get data form body
    const {name,slug} = req.body;

    if(!name || !slug){
        res.status(400).send('All fields are required!')
    }
    else{
        //data push
        tag.push({
            id : Math.floor(Math.random() * 10000000000).toString(),
            name,slug
        });

    // data push json db
    writeFileSync(path.join(__dirname,'../db/tag.json'),JSON.stringify(tag))
    res.status(201).send(`Data Created`);
    }

}



/**
 * @desc DELETE TAG DATA
 * @name DELETE  api/v1/tag/:id
 * @access public
 */
 const deleteTag = (req,res)=>{

    //get data from json db
    const tag = JSON.parse(readFileSync(path.join(__dirname,'../db/tag.json')));


    if(tag.some(data=>data.id == req.params.id)){

        // find delete tag data 
        const deleteTagData = tag.filter(data=>data.id != req.params.id);
        writeFileSync(path.join(__dirname,'../db/tag.json'),JSON.stringify(deleteTagData));
        res.status(201).send(`Data Delete Successfully`);  
    }
    else{
        res.status(404).send(`404 Not Found!`);  
    }
}



module.exports = {
    getAllTag,
    createTag,
    deleteTag
}
