const router = require('express').Router();
const Cart = require('../models/cart');
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyToken
} = require('../middleware/verifyToken');


//*Creat Cart
router.post("/", verifyToken, async(req, res) => {
    const newCart = new Cart(req.body);
    try {
        const saveProduct = await newCart.save();
        res.status(200).json(saveCart);
    } catch (err) {
        res.status(500).json(err);
    }
})

//*Update Cart
router.put("/:id", verifyTokenAndAuthorization, async(req, res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateCart);
    } catch (err) { res.status(500).json(err); }
})

//*delete Cart
router.delete("/:id", verifyTokenAndAuthorization, async(req, res) => {
    try {
        await Cart.findByIdAndRemove(req.params.id);
        res.status(200).json("this item has been deleted...")
    } catch (err) { res.status(500).json(err) }
})

//*find Cart
router.get("/:userId", verifyTokenAndAuthorization, async(req, res) => {
    try {
        const findCart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(findCart);
    } catch (err) { res.status(500).json(err) }
})

//*get all Carts
router.get("/", verifyTokenAndAdmin, async(req, res) => {
    try {
        await Cart.find();
        res.status(200).json(products);
    } catch (err) { res.status(500).json(err) }
})

module.exports = router