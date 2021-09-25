const router = require('express').Router();
const Order = require('../models/order');
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyToken
} = require('../middleware/verifyToken');


//*Creat Order
router.post("/", verifyToken, async(req, res) => {
    const newOrder = new Order(req.body);
    try {
        const saveProduct = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

//*Update Order
router.put("/:id", verifyTokenAndAdmin, async(req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateOrder);
    } catch (err) { res.status(500).json(err); }
})

//*delete Order
router.delete("/:id", verifyTokenAndAdmin, async(req, res) => {
    try {
        await Order.findByIdAndRemove(req.params.id);
        res.status(200).json("this item has been deleted...")
    } catch (err) { res.status(500).json(err) }
})

//*find Order
router.get("/:userId", verifyTokenAndAuthorization, async(req, res) => {
    try {
        const findOrder = await Order.find({ userId: req.params.userId });
        res.status(200).json(findOrder);
    } catch (err) { res.status(500).json(err) }
})

//*get all Orders
router.get("/", verifyTokenAndAdmin, async(req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) { res.status(500).json(err) }
})


//Get monthly income
router.get('/income', verifyTokenAndAdmin, async(req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gt: previousMonth } } },
            {
                $project: {
                    month: { $month: $createdAt },
                    sales: "$amount"
                },
                $group: {
                    _id: "$month",
                    totals: { $sum: "$sales" }
                }
            }
        ])
        res.status(200).json(income);
    } catch (err) { res.status(500).json(err) }
})
module.exports = router