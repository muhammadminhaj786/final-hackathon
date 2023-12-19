const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { createUser, SignUpController, LoginController, getUser, checkIn, getAttendence, oneUser } = require("../controller/userSignUp");
const upload = require("../utils/multer");


router.post("/api/create",upload.any("image"), SignUpController)
router.post("/api/login",LoginController)
router.get("/api/students",getUser)
router.get("/api/attendence",getAttendence)
router.post("/api/checkin", upload.any("image"), checkIn)
router.get("/api/user/:id",oneUser)


module.exports = router;