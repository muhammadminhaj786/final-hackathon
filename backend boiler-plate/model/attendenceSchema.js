const mongoose = require('mongoose')

const schema = new mongoose.Schema({

   roll_No: {
    type: String,
    required: true
   },
   imageUrl:{
    type:String,
    required:true
  },
  attendence:{
    type: String,
    default: false
  },
  token:{
    type: String
  }
},
{ timestamps: true }
)

const attModel = mongoose.model('attendence',schema);
module.exports = attModel