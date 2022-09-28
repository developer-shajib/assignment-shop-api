const express = require('express');
const dotenv = require('dotenv');
const { urlencoded } = require('express');
dotenv.config();
const customerRouter = require('./routes/customerRouter');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const tagRouter = require('./routes/tagRouter');

// get data to env file
const port = process.env.PORT || 8080;

// init express
const app = express();

// get from data with express middleware
app.use(express.json());
app.use(urlencoded({extended:false}));

// init page router
app.use('/api/v1/customer',customerRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/tag',tagRouter);


//server listen
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});