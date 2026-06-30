import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useToast } from '../context/ToastContext'

const Logout = () => {
    const { showToast } = useToast();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        showToast("Logged out successfully.", "info");
    }, [showToast]);

    return (
        <div className="logout-container">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="logout-card"
            >
                <h2>Logged Out</h2>
                <p>You have been successfully logged out of your account.</p>
                <Link to="/" className="auth-button" style={{ display: 'inline-block', textDecoration: 'none' }}>
                    Go to Login Page
                </Link>
            </motion.div>
        </div>
    )
}

export default Logout
