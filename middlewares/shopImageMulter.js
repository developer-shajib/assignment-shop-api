const multer = require('multer');
const path = require('path');


const productStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        if(file.fieldname == 'feature_img'){
            
            if(file.mimetype == 'image/jpg'
            || file.mimetype == 'image/jpeg'
            || file.mimetype == 'image/png'
             ){
                cb(null,path.join(__dirname,'../public/images/product/feature img/'));
            }
            else{
                console.log('Invalid image formate');
            }
        }
        if(file.fieldname == 'gallery_img'){
            
            if(file.mimetype == 'image/jpg'
            || file.mimetype == 'image/jpeg'
            || file.mimetype == 'image/png'
             ){
                cb(null,path.join(__dirname,'../public/images/product/galleryImg/'));
            }
            else{
                console.log('Invalid image formate');
            }
        }
    },
    filename : (req,file,cb) =>{
        cb(null, Date.noe() +'_'+ file.originalname)
    }
})



const shopImgMulter = multer({storage : productStorage}).fields([
    {
        name : 'feature_img',
        maxCount : 1
    },
    {
        name : 'gallery_img',
        maxCount : 10
    }
])


module.exports = shopImgMulter;