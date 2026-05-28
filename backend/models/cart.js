const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true // One cart per user
    },
    items: [
        {
            productId: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            priceCents: {
                type: Number,
                required: true
            },
            category: {
                type: String
            },
            image: {
                type: String
            },
            description: {
                type: String
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
})

module.exports = mongoose.model("Cart", cartSchema);
