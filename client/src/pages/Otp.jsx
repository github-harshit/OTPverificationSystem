import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import axios from "axios"; 
import {Link, useNavigate} from "react-router-dom"; 
import styles from "../styles/otp.module.css";
import image from "../images/undraw_confirmed_81ex.jpg";
import {useRef} from "react"
import AppContext from '../AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
function Otp() {
  const navigate = useNavigate();
  const {mobileNumber,setMobileOtp,  mobileOtp, } = useContext(AppContext); 
 
    const [values, setValues]  =  useState({
        b1: "", 
        b2 : "", 
        b3:"", 
        b4:""

    }); 
    const inputRefs = {
      b1: useRef(null),
      b2: useRef(null),
      b3: useRef(null),
      b4: useRef(null),
    };
    function showSnackbar( message) {
     
      toast.success(message, {
        position: 'bottom-right',
        autoClose: 10000, // Close after 3 seconds
      });
    }
     const message = `This is your otp ${mobileOtp}`;
     useEffect(()=>{
       if(mobileOtp){
          showSnackbar(message)
       }else{
         navigate("/"); 
       }
      
     }, [mobileOtp]) 
     

    

    const handleInputChange = (e, name) => {
      const { value } = e.target;
  
      // Check if the value is numeric (0-9)
      if (/^[0-9]$/.test(value) || value==='') {
        // Update the state for the current input
        setValues({
          ...values,
          [name]: value,
        });
  
        // Move focus to the next input field if it's not the last one
        if (name !== 'b4'  && value!=='') {
          inputRefs[`b${parseInt(name.charAt(1)) + 1}`].current.focus();
        }else if (value === '' && name !== 'b1') {
          // If the value is empty and it's not the first input, move focus to the previous input
          
      
          inputRefs[`b${parseInt(name.charAt(1)) - 1}`].current.focus();
        }
      }
    };

  
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      const inputValue = values.b1 + values.b2 + values.b3 + values.b4;
      console.log(inputValue); 
      try { 
        const config = {
          method: 'post', 
          url: 'http://localhost:5000/api/v1/user/otp', 
          data : {otp:inputValue}, 
          headers: {
            'Content-Type': 'application/json', 
          
          },
          withCredentials: true, 
        };
        
          const res  = await axios(config)
          
          if(res.data.status===200){
          
             navigate("/home")
          }else if(res.data.status===401){
               showSnackbar("Your otp is not matching ")
             
          }
       }catch(err){
         console.log(err); 
    
       } 
    }; 
      const  handleResend = async()=>{
        try { 
          const config = {
            method: 'post', 
            url: 'http://localhost:5000/api/v1/user/number', 
            data : {number:mobileNumber}, 
            headers: {
              'Content-Type': 'application/json', 
              
            },
            withCredentials: true, // Send cookies with the request (for cross-origin requests)
          
          };
            
            const res  = await axios(config)
            console.log(res.data) ; 
            setMobileOtp(res.data.otp); 
            
           
          
    
        }catch(err){
          console.log(err); 
    
        }
       
     }

   

  return (
    <>
    <div className={styles.container}>
 <div className={styles.imageContainer}>
   <img className={styles.image} src={image} alt='undrawConfirmed'></img>
 </div>
  <div className={styles.box}>
    <h2>Please verify Mobile number</h2>
    <p>An OTP is send to {mobileNumber}</p>
     <Link className={styles.link} to="/">Change Phone number </Link>
  </div>
  <form className={styles.form} onSubmit={handleSubmit} >
  <div className={styles.input}>
    
     <div className={styles.square}>
      <input name='b1' value={values.b1} onChange={(e) => handleInputChange(e, 'b1')} className={styles.input}  ref={inputRefs.b1}></input>
    </div>
    <div className={styles.square}>
      <input name='b2' value={values.b2} onChange={(e) => handleInputChange(e, 'b2')} className={styles.input}  ref={inputRefs.b2}></input>
    </div>
    <div className={styles.square}>
      <input name='b3' value = {values.b3} onChange={(e) => handleInputChange(e, 'b3')} className={styles.input}  ref={inputRefs.b3}></input>
    </div>
    <div className={styles.square}>
      <input name='b4' value={values.b4} onChange={(e) => handleInputChange(e, 'b4')} className={styles.input}  ref={inputRefs.b4}></input>
    </div>
   
      </div> 

      <div className= {styles.bottom}>
      <p> Didn't recieve the code ?  <span onClick={ handleResend}> Resend</span> </p>
      <button className={styles.btn}>Verify </button>
      </div>
     </form>

  
    
 
   
     <ToastContainer position="bottom-right" />
    </div>
    
    </>
   
  )
}

export default Otp