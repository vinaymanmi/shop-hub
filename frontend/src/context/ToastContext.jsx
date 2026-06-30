import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now() + Math.random().toString(36).substr(2, 9);
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

        // Auto remove toast after 4 seconds
        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    // Helper classes for colors
    const getToastStyles = (type) => {
        switch (type) {
            case 'success':
                return {
                    background: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    shadow: '0 0 20px rgba(16, 185, 129, 0.15)',
                    icon: <CheckCircle className="toast-icon text-emerald-400" size={18} />,
                    titleColor: 'text-emerald-400'
                };
            case 'error':
                return {
                    background: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    shadow: '0 0 20px rgba(239, 68, 68, 0.15)',
                    icon: <AlertCircle className="toast-icon text-rose-400" size={18} />,
                    titleColor: 'text-rose-400'
                };
            case 'info':
            default:
                return {
                    background: 'rgba(6, 182, 212, 0.05)',
                    border: '1px solid rgba(6, 182, 212, 0.25)',
                    shadow: '0 0 20px rgba(6, 182, 212, 0.15)',
                    icon: <Info className="toast-icon text-cyan-400" size={18} />,
                    titleColor: 'text-cyan-400'
                };
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Portal-like Toast Container overlay */}
            <div className="toast-container">
                <AnimatePresence>
                    {toasts.map((toast) => {
                        const styles = getToastStyles(toast.type);
                        return (
                            <motion.div
                                key={toast.id}
                                layout
                                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 20
                                }}
                                className="toast-item"
                                style={{
                                    background: styles.background,
                                    border: styles.border,
                                    boxShadow: styles.shadow,
                                    backdropFilter: 'blur(12px)',
                                    borderRadius: '12px',
                                    padding: '12px 16px',
                                    marginBottom: '10px',
                                    width: '320px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '12px',
                                    color: '#f3f4f6'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                    {styles.icon}
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.4 }}>
                                        {toast.message}
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#9ca3af',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '2px',
                                        borderRadius: '4px',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f3f4f6')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
                                >
                                    <X size={14} />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
