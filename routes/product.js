const router = require('express').Router();
const Product = require('../models/product');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');


//*Creat project
router.post("/", verifyTokenAndAdmin, async(req, res) => {
    const newProduct = new Product(req.body);
    try {
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

//*Update Product by admin
router.put("/:id", verifyTokenAndAdmin, async(req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateProduct);
    } catch (err) { res.status(500).json(err); }
})

//*delete Product by admin 
router.delete("/:id", verifyTokenAndAdmin, async(req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.status(200).json("this item has been deleted...")
    } catch (err) { res.status(500).json(err) }
})

//*find Product by admin or user
router.get("/:id", async(req, res) => {
    try {
        const findProduct = await Product.findById(req.params.id);
        res.status(200).json(findProduct);
    } catch (err) { res.status(500).json(err) }
})

//*get all product
router.get("/", async(req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 })
        } else if (qCategory) {
            products = await Product.find({
                category: { $in: [qCategory] }

            });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) { res.status(500).json(err) }
})

module.exports = router