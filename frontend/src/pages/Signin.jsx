import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const signin=async () => {
        const response = await axios.post("http://localhost:5000/signin",{name,email,password});
        alert(response.data.message)
    }
  return (
    
    <div>
      <h1>Signin </h1>
      <p>signin to Student-Store </p>
          <input type="text" placeholder='Enter your name' onChange={(e) => {
                      setName(e.target.value);
          }}/>

          <br /><br />
          <input type="email" placeholder='Enter your email' onChange={(e) => {
            setEmail(e.target.value);
          }}/>
          
          <br /><br />
          <input type="password" placeholder='Enter your password' onChange={(e) => {
            setPassword(e.target.value);
          }}/>
          

          <br /><br />

          <button onClick={signin}>Signin</button>

          <p>Do you have an account <Link to="/">login</Link></p>
    </div>
  )
}

export default Signin