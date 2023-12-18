
require('dotenv').config();
const express = require("express")
const mongoose = require('mongoose')
const app = express();
const cors = require("cors");
const router = require("./routes")
const cloudinary = require("cloudinary").v2;
const PORT = 8080;

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// mongo connection
const DB_URL = mongoose.connect('mongodb+srv://minhajwahid:HaniaEB20103087@cluster0.yxxq8sv.mongodb.net/')
mongoose.connection.on('connected',()=>{console.log('mongo connected sucessfuly')})
mongoose.connection.on('error',(err)=>{console.log('mongo connected sucessfuly',err.message)})

//cloudnary connection
cloudinary.config({ 
  cloud_name: 'dmuf5myro', 
  api_key: '829968978782487', 
  api_secret: 'AGrf9fDp8Nq74q-tp_3asDfReNA' 
});

//check
app.get('/',(req,res)=>{
    res.json({
        message:"server up"
    })
})

//App api
app.use(router);


app.listen(PORT,()=>{
    console.log('server is runing')
})