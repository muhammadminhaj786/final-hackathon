const userModel = require("../model/userSchema");
const { fileUploader } = require("../utils/fileUploader");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const attModel = require("../model/attendenceSchema")

  const SignUpController = async (req,res) =>{
    try {
        bodyData = req.body;
        console.log(req.body)
        
    const image = req.files[0].path;
    // console.log(image);
    console.log(bodyData);

        const { fullName, email, password } = bodyData;
        // if (
        //   !fullName ||
        //   !email ||
        //   !password 
        // ) {
        //   return res.status(400).send({message: "required fields are missing"})
        // }
    
        console.log(password, "real");
        const hashpass = await bcrypt.hash(password, 5);
        const imageurl = await fileUploader(image)
        const objToSend = {
            full_Name: fullName,
          email,
          password: hashpass,
          user_type: "student",
          imageUrl: imageurl.secure_url
        };
    
        const emailExist = await userModel.findOne({ email });
        console.log(emailExist, "emailExist");
        if (emailExist) {
          return res.status(400).send({message: "this email have already using"})
        }
        const userSave = await userModel.create(objToSend);
    
        res.status(200).json({status: true, message: "user successfully signup",data:userSave})
      } catch (error) {
        res.json({
          status: false,
          message: error.message,
          data: null,
        });
      }
}
//login api
const LoginController = async (req,res)=>{
    const {email,password} = req.body
    console.log(email,password)

    if(!email || !password) {
        res.status(400).json({
            status: false,
            message: "required fields are missing",
            data: null
        });
        return
    }

    const emailExist = await userModel.findOne({email})
    if(!emailExist){
        res.json({
            message: "invalid credentials",
            status: false,
            data: null
        })
        
    }
    const comparePass = await bcrypt.compare(password,emailExist.password)
    if(comparePass){

        var token = jwt.sign({email:emailExist.email},'Hania')
        console.log(token)

        res.json({
            message:'User Login',
            status: true,
            data: emailExist,
            token
        })
        return
    }
    else{
        res.json({
            message: 'invalid credentials',
            status: false,
            data: null
        })
    }
}

//students get
const getUser = async (req,res) =>{
        try {
            const userRec = await userModel.find({})
            console.log(userRec)
            res.json({
                status: true,
                message: "succesfully get all users",
                data: userRec
            })

        } catch (error) {
            res.json({
                status: false,
                message: "did'nt get users",
                data: null
            })
            
        }
}

//check In api
const checkIn = async (req,res) =>{
    try {
        bodyData = req.body;
        console.log(req.body)
        
        
    const image = req.files[0].path;
    console.log(bodyData);

        const { rollNo,id,fullName } = bodyData;
        const imageurl = await fileUploader(image)
        const options = {
            expiresIn: '1m', // 1 minute
          };
        var token = jwt.sign({rollNo},'Hania',options)
        console.log(token)
        const objToSend = {
            roll_No: rollNo,
          imageUrl: imageurl.secure_url,
          token,
          attendence:true,
          id,
          full_Name: fullName
        };
        const userSave = await attModel.create(objToSend);
    
        res.status(200).json({status: true, message: "user successfully signup",data:userSave})
      } catch (error) {
        res.json({
          status: false,
          message: error.message,
          data: null,
        });
      }
}

//get all attendence api
const getAttendence = async (req,res) =>{
    try {
        const userRec = await attModel.find({})
        console.log(userRec)
        res.json({
            status: true,
            message: "succesfully get all users",
            data: userRec
        })

    } catch (error) {
        res.json({
            status: false,
            message: "did'nt get users",
            data: null
        })
        
    }
}

//get only one user api
const oneUser = async (req,res)=>{
  try {
    const {id} = req.params
    const userRef = await userModel.findById(id)
    res.status(200).send({
      message: "Get user",
      data: userRef
    })
  } catch (error) {
    res.json({
      status: false,
      message: "did'nt get user",
      data: null
    })
  }
  
}



  module.exports = {
    SignUpController,
    LoginController,
    getUser,
    checkIn,
    getAttendence,
    oneUser
  };
  