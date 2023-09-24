import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import  axios  from "axios";
import {useNavigate} from "react-router-dom"; 
import styles from "../styles/number.module.css"; 
import logo from "../images/AK_logo.jpg"; 
import AppContext from '../AppContext';

import countryCodes from '../countryCodes';
function Number() {
   const navigate  = useNavigate(); 
   const { setMobileNumber, setMobileOtp} = useContext(AppContext); 

   
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91'); // Default country code
  const [phoneNumber, setPhoneNumber] = useState('');
 
  
  const handleCountryCodeChange = (e) => {
    console.log(e.target.value)
    setSelectedCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    const numericRegex = /^[0-9]*$/;
    
    if (numericRegex.test(e.target.value)) {
      // Check if the input length is less than or equal to 10
      if (e.target.value.length <= 10) {
        setPhoneNumber(e.target.value);
        
      } 
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  const number  = selectedCountryCode + " " +  phoneNumber;
  console.log(number)
 
    try { 
      const config = {
        method: 'post', 
        url: 'http://localhost:5000/api/v1/user/number', 
        data : {number:number}, 
        headers: {
          'Content-Type': 'application/json', 
          
        },
        withCredentials: true, // Send cookies with the request (for cross-origin requests)
      
      };
        
        const res  = await axios(config)
        console.log(res.data) ; 
        setMobileOtp(res.data.otp); 
        setMobileNumber(number); 
        if(res.data.status===200){
          navigate("/otp")
        }
      

    }catch(err){
      console.log(err); 

    }
   
  };

 

  return (
    <>
      <div className={styles.container}>
       <div className= {styles.imageContainer}>
       <img className={styles.image} src={logo} alt= "Admit Kard"></img>
       </div>

       <div className={styles.box}>
        <h2 className={styles.heading}> Welcome Back </h2>
         <p className={styles.para}>Please sign in to your account</p>
       </div>
       <div className= {styles.formGroup}>
        <form onSubmit={handleSubmit} className= {styles.form}>
          <div className= {styles.input}>
          <div className={styles.code}>
           
            <select name="countrySelect"  value={selectedCountryCode}
            onChange={ handleCountryCodeChange} 
            >
            {countryCodes.map((item) => (
              
              
              <option key={item.code} value={item.code}>
              
               <div className={styles.flagContainer}>
                <img className= {styles.flag}></img>
               </div>
                {item.code}
              </option> 
             
            ))} 

            </select>
         </div>
        <div className={styles.number}>
           
            <input  type="tel"
            placeholder="Enter phone number"
            aria-label="Phone number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange} />
             
        </div>


          </div>

          <p className={styles.boxPara}>
          We will send you a one time SMS message. <br></br>Charges may apply.

          </p>

          <button  className={styles.btn}>Sign in with OTP</button>
       
        </form>

       </div>
       
       
     </div>
    
     

    </>
 
   
    
  );
}

export default Number