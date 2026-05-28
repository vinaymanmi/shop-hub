import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")

    const login=async () => {
        const response = await axios.post("http://localhost:5000/login",{email,password});
        alert(response.data.message)
    }
  return (
    <div>
        <h2>Login Account</h2>

        <input type="email" placeholder='email@gmail.com' onChange={(e) => {
            setEmail(e.target.value);
            require
        }}/>

        <br /><br />

        <input type="password" placeholder='Password' onChange={(e) => {
            setPassword(e.target.value);
            require
        }}/>

        {/* <h2>{email,password}</h2> */}
        <br /><br />

        <button onClick={login}>Login</button>

        <br /><br />

        <p>Don't have an account?
            <Link to="/signin">Sign in</Link>
        </p>
        
    </div>
  )
}

export default Login