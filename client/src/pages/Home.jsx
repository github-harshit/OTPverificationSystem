import React, { useEffect, useContext } from 'react'
import styles from "../styles/home.module.css"; 
import image from "../images/Artboard 1.jpg"
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
function Home(){
   const navigate = useNavigate(); 
   const {setMobileOtp,  mobileOtp, } = useContext(AppContext); 
   const handleBackButtonClick = ()=>{
     setMobileOtp(""); 
   }

    useEffect(()=>{
      window.addEventListener('popstate', handleBackButtonClick);
       if(!mobileOtp){
         navigate("/"); 
       }
    })
  return (
    <div className={styles.container}>
      <div className= {styles.imageContainer}>
        <img className = {styles.image} src= {image} alt='Artboard '></img>
      </div>
       <div className={styles.box}>
        <h1 className={styles.heading}>Welcome to AdmitKard</h1>
        <p className= {styles.para}>In order to provide you with 
        <br></br>a custom experience,
        <br></br> <span>we need to ask you a few questions.</span>
       </p>
       </div>
        <div className={styles.bottom}>
          <button className={styles.btn}> Get started </button>
          <p className={styles.bottomPara}> This will only take 5 minutes </p>
        </div>

        </div>
  )
}

export default Home 