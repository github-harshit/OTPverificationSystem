# OTP Verification System

This OTP (One-Time Password) verification system is built using the MERN (MongoDB, Express, React, Node.js) stack. It allows you to verify users' mobile numbers using OTPs.

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- Node.js and npm (Node Package Manager)
- MongoDB Atlas account (for database)
- Git (optional, for cloning the repository)

## Getting Started

Follow these steps to set up the OTP verification system:

### Frontend (React)

1. Open the terminal and navigate to the frontend directory:

   ```bash
   cd client
   npm install
   npm start
The frontend should now be running at http://localhost:3000.

### Backend (Node.js, MongoDB)
Create a .env file in the root directory of the backend (server) folder.

In the .env file, define the following environment variables:
```
  PORT=5000 # Specify the port on which the backend server will run
  MONGO_URL=your_mongodb_connection_string # Replace with your MongoDB Atlas connection string
```
Make sure to replace your_mongodb_connection_string with your actual MongoDB Atlas connection string.

```bash
 cd server
 npm install
 npm start
```

The backend server should now be running at http://localhost:5000.
### Usage
Once both the frontend and backend are up and running, you can access the OTP verification system by visiting http://localhost:3000 in your web browser. Users can enter their mobile numbers and receive OTPs for verification.
Only verified user can move to home page 











   
