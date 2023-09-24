const express = require('express'); 
const app = express(); 
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose"); 
const cors = require('cors'); 
const dotenv = require("dotenv"); 
dotenv.config(); 
 const userRouter = require("./routes/userRouter"); 
 

 const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified HTTP methods
    credentials: true, // Enable credentials (cookies, HTTP authentication)
    optionsSuccessStatus: 204, // Set the response status code for preflight requests
  };
  
app.use(cors((corsOptions))); 
app.use(cookieParser())
app.use(express.json()); 
app.use("/api/v1/user", userRouter); 

app.listen(process.env.PORT ,  ()=>{
     console.log("app is listening on port", process.env.PORT)
}); 

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected successfully'));

