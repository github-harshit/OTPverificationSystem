 const express = require("express"); 
 const router = express.Router(); 
 const {getNumberAndGenerateOTP, verifyOTP} = require("../controllers/userController")
 router.post("/number", getNumberAndGenerateOTP); 
 router.post("/otp",verifyOTP)

module.exports =  router; 
