import React from 'react'
import { Navigate,useLocation } from 'react-router-dom';
// import axios from 'axios';

const ProtectedRoute = ({ children }) => {

  // let isvalidUser = false;
  // useEffect(()=>{
  //   const user = localStorage.getItem('login');
  //   let [name, ...password] = window.atob(user).split(':');
  //   password = password.join(':');

  //   const formData = new URLSearchParams({
  //     name: name,
  //     password: password
  //   });
    
  //     try {
  //       const response =  axios.post('http://localhost:5000/login',
  //         formData.toString(),{
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         }
  //       } );
  //       console.log({ name : name, password : password });
  //       if(response.data.message==="Logged in successfully"){
  //         isvalidUser=true;
  //       }
  //       isvalidUser=false;
  //     } catch (error) {
  //       console.error(error);
  //     }
  // },[])
    


  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'false') {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;
