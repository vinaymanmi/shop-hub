import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Signin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { showToast } = useToast();

    const signin = async () => {
        if (!name || !email || !password) {
            showToast("Please fill in all fields", "error");
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/signin`,
                { name, email, password }
            );

            const data = response.data;

            if (data?.userdata) {
                showToast("Account Created Successfully! Please login.", "success");
                navigate("/");
                return;
            }

            showToast(data?.message || "Enter correct email or password", "error");

        } catch (error) {
            const msg =
                error.response?.data?.message ||
                error.response?.data ||
                error.message;

            showToast("Error: " + msg, "error");
        }
    };

    return (
        <div className="auth-container">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="auth-card"
            >
                <h1>Create Account</h1>
                <p className="auth-subtitle">Join ShopHub to get started</p>

                <div className="auth-form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="auth-form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="auth-input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="auth-form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(255, 42, 109, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="auth-button" 
                    onClick={signin}
                >
                    Sign Up
                </motion.button>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/">Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signin;