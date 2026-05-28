const Product = require("../models/product");

const createProduct = async (req,res) => {
    try {
        const {name,price,category} = req.body;
        const data = await Product.create({name,price,category})
        res.json({
            message:"Product Added",
            data
        })
    } catch (e) {
        res.send(e.message);
    }
}

const getProducts = async (req,res) => {
    try {
        const data = await Product.find();
        res.json(data);
    } catch (e) {
        res.send(e.message);
    }
}

const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.json({
            message:"Product Deleted"
        })
    } catch (e) {
        res.send(e.message);
    }
}

module.exports = {createProduct,getProducts,deleteProduct}