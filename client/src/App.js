
import './App.css';
import Number from './pages/Number';
import Otp from "./pages/Otp"; 
import Home from "./pages/Home"
 import {Routes, Route} from "react-router-dom";
 import CountrySelector  from './Sample';

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path='/' element = {<Number/>}></Route>
        <Route path='/otp' element = {<Otp/>}></Route>
        <Route path='/home' element = {<Home/>}></Route>
      </Routes>
  
     
    </div>
  );
}

export default App;
