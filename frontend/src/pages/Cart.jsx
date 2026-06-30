import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useToast } from '../context/ToastContext'

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const fetchCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            showToast("Please login first.", "error");
            navigate("/");
            return;
        }
        try {
            const response = await axios.get(`${BASE_URL}/cart`, {
                headers: { Authorization: token }
            });
            if (response.data && response.data.items) {
                setCart(response.data.items);
            }
        } catch (e) {
            console.error("Error fetching cart:", e);
            showToast("Failed to fetch cart data.", "error");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const increaseQty = async (productId, currentQty) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${BASE_URL}/cart/update`, {
                productId,
                quantity: currentQty + 1
            }, {
                headers: { Authorization: token }
            });
            if (response.data && response.data.items) {
                setCart(response.data.items);
                showToast("Quantity increased.", "success");
            }
        } catch (e) {
            console.error("Error updating quantity:", e);
            showToast("Failed to update quantity.", "error");
        }
    };

    const decreaseQty = async (productId, currentQty) => {
        if (currentQty <= 1) {
            removeItem(productId);
            return;
        }
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${BASE_URL}/cart/update`, {
                productId,
                quantity: currentQty - 1
            }, {
                headers: { Authorization: token }
            });
            if (response.data && response.data.items) {
                setCart(response.data.items);
                showToast("Quantity decreased.", "success");
            }
        } catch (e) {
            console.error("Error updating quantity:", e);
            showToast("Failed to update quantity.", "error");
        }
    };

    const removeItem = async (productId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${BASE_URL}/cart/remove`, {
                productId
            }, {
                headers: { Authorization: token }
            });
            if (response.data && response.data.items) {
                setCart(response.data.items);
                showToast("Item removed from cart.", "info");
            }
        } catch (e) {
            console.error("Error removing item:", e);
            showToast("Failed to remove item.", "error");
        }
    };

    // Calculations
    const getSubtotal = () => {
        return cart.reduce((total, item) => total + (item.priceCents * item.quantity), 0) / 100;
    };

    const getDeliveryFee = () => {
        const subtotal = getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= 500 ? 0 : 50;
    };

    const getTax = () => {
        return getSubtotal() * 0.05;
    };

    const getOrderTotal = () => {
        return getSubtotal() + getDeliveryFee() + getTax();
    };

    const handleCheckout = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.post(`${BASE_URL}/cart/clear`, {}, {
                headers: { Authorization: token }
            });
            showToast("🎉 Order placed successfully! Thank you for choosing ShopHub.", "success");
            setCart([]);
            navigate("/home");
        } catch (e) {
            console.error("Error clearing cart on checkout:", e);
            showToast("Could not complete checkout. Please try again.", "error");
        }
    };

    // Framer Motion Variants
    const cartPageVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        show: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={cartPageVariants}
        >
            <header className="home-navbar">
                <div className="store-brand" onClick={() => navigate("/home")} style={{ cursor: 'pointer' }}>
                    ShopHub
                </div>
                <div className="navbar-actions">
                    <button 
                        type="button" 
                        className="nav-link logout-btn" 
                        onClick={() => navigate("/logout")}
                        style={{ cursor: "pointer", border: "none", background: "transparent" }}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="cart-page-container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <Link to="/home" className="back-to-store-btn">
                        Continue Shopping
                    </Link>
                </div>

                <AnimatePresence mode="wait">
                    {cart.length === 0 ? (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="empty-cart-card"
                        >
                            <div className="empty-cart-icon">🛒</div>
                            <h3>Your cart is empty</h3>
                            <p>Looks like you haven't added anything to your cart yet.</p>
                            <Link to="/home" className="auth-button" style={{ display: 'inline-block', width: 'auto', padding: '12px 30px', textDecoration: 'none' }}>
                                Start Shopping
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="layout"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="cart-layout"
                        >
                            {/* Cart items list with layout transitions */}
                            <div className="cart-items-section">
                                <AnimatePresence initial={false}>
                                    {cart.map((item) => (
                                        <motion.div 
                                            key={item.productId} 
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                                            className="cart-item-card"
                                        >
                                            <div className="cart-item-img">
                                                <img src={item.image} alt={item.name} />
                                            </div>

                                            <div className="cart-item-details">
                                                <p className="cart-item-category">{item.category}</p>
                                                <h3>{item.name}</h3>
                                                <span className="cart-item-price">₹{item.priceCents / 100}</span>
                                            </div>

                                            <div className="cart-item-controls">
                                                <div className="quantity-control">
                                                    <button 
                                                        className="qty-btn" 
                                                        onClick={() => decreaseQty(item.productId, item.quantity)}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="qty-val">{item.quantity}</span>
                                                    <button 
                                                        className="qty-btn" 
                                                        onClick={() => increaseQty(item.productId, item.quantity)}
                                                        aria-label="Increase quantity"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <motion.button 
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="remove-item-btn" 
                                                    onClick={() => removeItem(item.productId)}
                                                    aria-label="Remove item"
                                                >
                                                    🗑️
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Order Summary box */}
                            <div className="summary-card">
                                <h2>Order Summary</h2>
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>₹{getSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Estimated GST (5%)</span>
                                    <span>₹{getTax().toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Delivery Fee</span>
                                    <span>{getDeliveryFee() === 0 ? "FREE" : `₹${getDeliveryFee().toFixed(2)}`}</span>
                                </div>
                                
                                {getDeliveryFee() > 0 && (
                                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '-4px 0 12px', textAlign: 'right' }}>
                                        Add ₹{(500 - getSubtotal()).toFixed(2)} more for FREE Delivery!
                                    </p>
                                )}

                                <div className="summary-row total-row">
                                    <span>Total</span>
                                    <span>₹{getOrderTotal().toFixed(2)}</span>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="checkout-btn" 
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Cart;
