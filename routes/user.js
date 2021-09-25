const router = require('express').Router();
const User = require('../models/user')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');

//updating
router.put('/:id', verifyTokenAndAuthorization, async(req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateUser);
    } catch (err) { res.status(500).json(err); }
})

//delete
router.delete('/:id', verifyTokenAndAuthorization, async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted...');
    } catch (err) { res.status(500).json(err); }
})


//get user by admin
router.get('/find/:id', verifyTokenAndAdmin, async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...other } = user._doc;
        res.status(200).json(other);
        next();
    } catch (err) { res.status(500).json(err); }
})

//find all by admin
router.get('/', verifyTokenAndAdmin, async(req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
        next();
    } catch (err) { res.status(500).json(err); }
})
module.exports = router