import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    const signin=async () => {
        if (!name || !email || !password) {
            alert("Please fill in all fields");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/signin",{name,email,password});
            if (typeof response.data === 'string') {
                alert(response.data);
            } else if (response.data && response.data.userdata) {
                alert("Account Created Successfully!");
                navigate("/");
            } else {
                alert(response.data?.message || "Signin failed");
            }
        } catch (e) {
            alert("Error signing in: " + e.message);
        }
    }

  return (
    <div className="auth-container">
        <div className="auth-card">
            <h1>Create Account</h1>
            <p className="auth-subtitle">Join ShopHub to get started</p>

            <div className="auth-form-group">
                <label>Full Name</label>
                <input 
                    type="text" 
                    className="auth-input" 
                    placeholder='Enter your name' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="auth-form-group">
                <label>Email Address</label>
                <input 
                    type="email" 
                    className="auth-input" 
                    placeholder='Enter your email' 
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

            <button className="auth-button" onClick={signin}>Sign Up</button>

            <p className="auth-footer">
                Already have an account? 
                <Link to="/">Login</Link>
            </p>
        </div>
    </div>
  )
}

export default Signin