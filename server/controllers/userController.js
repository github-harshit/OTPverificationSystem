const OTP = require("../models/otpSchema"); 
const uuid = require("uuid"); 



function parseMobileNumber(inputString) {
    // Regular expression to match the country code and the numeric part
    const trimmedInput = inputString.trim(); // Remove leading/trailing spaces
    const pattern = /^(\+\d{1,3})?\s?(\d+)$/;

  
    // Use regex to extract the country code and numeric part
    const match = trimmedInput.match(pattern);
  
    if (match) {
      const countryCode = match[1];
      const phoneNumber = match[2];
      
      return {
        countryCode: countryCode,
        phoneNumber: phoneNumber,
      };
    } else {
      // Handle invalid input, if necessary
      return null;
    }
  }
  function generateOTP() {
    // Generate a random number between 1000 and 9999 (inclusive)
    const min = 1000;
    const max = 9999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  
    // Convert the OTP to a string (if needed)
    const otpString = otp.toString();
  
    // Ensure the OTP is exactly four digits (pad with leading zeros if necessary)
    return otpString.padStart(4, '0');
  }
  function generateSessionIdentifier() {
    // Generate a new UUID (v4) and return it as a string
    return uuid.v4();
  }

  const getNumberAndGenerateOTP = async (req, res)=>{

    try{
      
        const number = req.body.number; 
        console.log(number); 
         const result = parseMobileNumber(number); 
         
         if(result===null){
             return res.json({
                 status:400,
                 msg : "invalid number"
             })
         }else{
             const phoneNumber = result.phoneNumber; 
              if(phoneNumber.length!==10){
                return res.json({
                    status:401,
                    msg : "enter 10 digit number "
                })
              }
              const otp = generateOTP(); 
              const sessionIdentifier = generateSessionIdentifier();
              const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
              const newOTP = new OTP({
                sessionIdentifier: sessionIdentifier,
                otp: otp,
                expirationTime: expirationTime,
                
              });
              await newOTP.save(); 

              res.cookie('otpCookie', sessionIdentifier, {
                maxAge: 24 * 60 * 60 * 1000, 
              
              });
             
    
    
        
    
             return res.json({
                 status:200,
                 msg : "Successfull", 
                 number :number, 
                 otp:otp, 
                 sessionIdentifier:sessionIdentifier
                 
             })
         }
         
    }catch(err){
         const errMsg = err.toString();
          return res.json({
            status:500,
            err: errMsg
             
          })
    }
  
 }

 const verifyOTP = async (req, res)=>{
     try {
       
     const otp = req.body.otp; 
    const otpCookieValue = req.cookies.otpCookie;
    console.log(otpCookieValue); 
    const storedotp = await OTP.findOne({sessionIdentifier: otpCookieValue}); 
     if(storedotp){
        if(storedotp.otp===otp){
             return res.json({
                status:200, 
                msg: "user is verified "
             })
        }else{
            return res.json({
                status:401,
                msg: 'otps  are  not matching '
            })
             
        }
         
     }else{
         return res.json({
             status:401,
             msg: 'there is no stored otp something wrong with cookie'
         })
         
     }

         
     }catch(err){
        const errMsg = err.toString();
         return res.json({
           status:500,
           err: errMsg
            
         })
   }
   
    


     
 }

 module.exports = {
     getNumberAndGenerateOTP,
     verifyOTP
 }