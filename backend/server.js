const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

const port = process.env.port;
const mongo_url = process.env.mongo_url;

const { createAccount, login, logout } = require("./controllers/user");
const {createProduct,getProducts,deleteProduct} = require("./controllers/product")
const { getCart, addToCart, updateCartQty, removeFromCart, clearCart } = require("./controllers/cart");

const auth = require("./middleware/auth");

app.use(express.json());
app.use(cors());

app.post("/signin", createAccount);
app.post("/login", login);
app.post("/logout", logout);

app.post("/create-product", createProduct);
app.get("/get-products",getProducts);
app.get("/api/delete-products/:id",deleteProduct);

// Authenticated Cart Routes
app.get("/cart", auth, getCart);
app.post("/cart/add", auth, addToCart);
app.post("/cart/update", auth, updateCartQty);
app.post("/cart/remove", auth, removeFromCart);
app.post("/cart/clear", auth, clearCart);

mongoose.connect(mongo_url)
.then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () => {
        console.log(`Server Running On Port ${port}`);
    });
})
.catch((e) => {
    console.log("ERROR", e);
});