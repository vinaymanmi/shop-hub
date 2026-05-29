import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const navigate = useNavigate();

    const login=async () => {
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/login`,{email,password});
            if (typeof response.data === 'string') {
                alert(response.data);
            } else if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("email", email);
                alert("Login Success!");
                navigate("/home");
            } else {
                alert(response.data?.message || "Login failed");
            }
        } catch (e) {
            alert("Error logging in: " + e.message);
        }
    }

  return (
    <div className="auth-container">
        <div className="auth-card">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Login to your ShopHub account</p>

            <div className="auth-form-group">
                <label>Email Address</label>
                <input 
                    type="email" 
                    className="auth-input" 
                    placeholder='email@gmail.com' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="auth-form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    className="auth-input" 
                    placeholder='Enter your password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="auth-button" onClick={login}>Login</button>

            <p className="auth-footer">
                Don't have an account? 
                <Link to="/signin">Sign in</Link>
            </p>
        </div>
    </div>
  )
}

export default Login