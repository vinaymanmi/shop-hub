import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useToast } from '../context/ToastContext'

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { showToast } = useToast();

    const login = async () => {
        if (!email || !password) {
            showToast("Please fill in all fields", "error");
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/login`, { email, password });
            if (typeof response.data === 'string') {
                showToast(response.data, "error");
            } else if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("email", email);
                showToast("Login Successful! Welcome back.", "success");
                navigate("/home");
            } else {
                showToast(response.data?.message || "Login failed. Please check credentials.", "error");
            }
        } catch (e) {
            showToast("Error logging in: " + e.message, "error");
        }
    }

    return (
        <div className="auth-container">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="auth-card"
            >
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

                <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(255, 42, 109, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="auth-button" 
                    onClick={login}
                >
                    Login
                </motion.button>

                <p className="auth-footer">
                    Don't have an account? 
                    <Link to="/signin">Sign in</Link>
                </p>
            </motion.div>
        </div>
    )
}

export default Login