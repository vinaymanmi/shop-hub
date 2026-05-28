const Cart = require("../models/cart");

// Helper to find or create cart for a user
const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await Cart.create({ userId, items: [] });
    }
    return cart;
};

const getCart = async (req, res) => {
    try {
        const cart = await getOrCreateCart(req.userId);
        res.json(cart);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, name, priceCents, category, image, description } = req.body;
        const cart = await getOrCreateCart(req.userId);

        const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += 1;
        } else {
            cart.items.push({
                productId,
                name,
                priceCents,
                category,
                image,
                description,
                quantity: 1
            });
        }

        await cart.save();
        res.json(cart);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const updateCartQty = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await getOrCreateCart(req.userId);

        const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
        if (existingItemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(existingItemIndex, 1);
            } else {
                cart.items[existingItemIndex].quantity = quantity;
            }
            await cart.save();
        }
        res.json(cart);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const cart = await getOrCreateCart(req.userId);

        cart.items = cart.items.filter(item => item.productId !== productId);
        await cart.save();
        res.json(cart);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const cart = await getOrCreateCart(req.userId);
        cart.items = [];
        await cart.save();
        res.json(cart);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart
};
