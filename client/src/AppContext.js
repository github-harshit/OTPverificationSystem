import {useState, createContext} from "react"; 
const AppContext = createContext(); 
function Provider ({children}){
     const [mobileNumber, setMobileNumber] = useState(""); 
     const[mobileOtp, setMobileOtp] = useState(""); 

    const valueToShare = {
         mobileNumber, 
         setMobileNumber, 
         mobileOtp, 
         setMobileOtp
    }    

    return (<AppContext.Provider value={valueToShare}>
        {children}
    </AppContext.Provider>
    )
}
export default AppContext; 
export {Provider}; 
