import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const fetchCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first.");
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
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const increaseQty = async (productId, currentQty) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${BASE_URL}/cart/update`,{
                productId,
                quantity: currentQty + 1
            }, {
                headers: { Authorization: token }
            });
            if (response.data && response.data.items) {
                setCart(response.data.items);
            }
        } catch (e) {
            console.error("Error updating quantity:", e);
        }
    };

    const decreaseQty = async (productId, currentQty) => {
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
            }
        } catch (e) {
            console.error("Error updating quantity:", e);
        }
    };

    // Remove item completely
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
            }
        } catch (e) {
            console.error("Error removing item:", e);
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
            alert("🎉 Order placed successfully!");
            setCart([]);
            navigate("/home");
        } catch (e) {
            console.error("Error clearing cart on checkout:", e);
            alert("Could not complete checkout. Please try again.");
        }
    };

    return (
        <div>
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

                {cart.length === 0 ? (
                    <div className="empty-cart-card">
                        <div className="empty-cart-icon">🛒</div>
                        <h3>Your cart is empty</h3>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/home" className="auth-button" style={{ display: 'inline-block', width: 'auto', padding: '12px 30px', textDecoration: 'none' }}>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        {/* Cart items list */}
                        <div className="cart-items-section">
                            {cart.map((item) => (
                                <div key={item.productId} className="cart-item-card">
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

                                        <button 
                                            className="remove-item-btn" 
                                            onClick={() => removeItem(item.productId)}
                                            aria-label="Remove item"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
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

                            <button className="checkout-btn" onClick={handleCheckout}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
