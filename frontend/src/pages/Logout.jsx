import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    }, []);

    return (
        <div className="logout-container">
            <div className="logout-card">
                <h2>Logged Out</h2>
                <p>You have been successfully logged out of your account.</p>
                <Link to="/" className="auth-button" style={{ display: 'inline-block', textDecoration: 'none' }}>
                    Go to Login Page
                </Link>
            </div>
        </div>
    )
}

export default Logout
