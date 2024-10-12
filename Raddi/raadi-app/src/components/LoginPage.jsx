import '../App.css';
import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ProjectSettings } from '../ProjectSettingsContext';


export default function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  
  const settings = useContext(ProjectSettings);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams({
      name: username,
      password: password
    });
    
    try {
      const response = await axios.post(`http://${settings.env==="dev"?settings.ipAddr:'localhost'}:5000/login`,
        formData.toString(),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      } );
      console.log({ name : username, password : password });
      // localStorage.setItem('login',window.btoa(`${username}:${password}`))
      if(response.data.message==="Logged in successfully"){
        localStorage.setItem('isLoggedIn', true);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      // localStorage.setItem('login',window.btoa(`${username}:${password}`))
      localStorage.setItem('isLoggedIn', false);
      alert('Invalid credentials');
    }

  };


  return (
    <>  

    <div className="login-form" style={{backgroundColor: "white"}}>
  <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      User Name
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputEmail1"
      name="name"
      aria-describedby="emailHelp"
      value={username} onChange={(e) => setUsername(e.target.value)}
    />
    <div id="emailHelp" className="form-text">
      We'll never share your details with anyone else.
    </div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      name="password"
      value={password} onChange={(e) => setPassword(e.target.value)} 
    />
  </div>
  
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>
</div>
    </>
  )
}
