const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    full_Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl:{
        type:String,
        required:true
      },
    user_type: {
        type: String,
    }
},
{ timestamps: true }
)

const userModel = mongoose.model('user',schema);
module.exports = userModel