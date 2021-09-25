const router = require('express').Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')
const User = require('../models/user')


// register
router.post('/register', async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err.message);
    }
})

//adding
router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("password or username is invalid")
            // password encryption
        const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY)
            // Password comparison
        const OrigPassword = hashedPass.toString(CryptoJS.enc.Utf8);
        OrigPassword !== req.body.password &&
            res.status(401).json("password or username is invalid");
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_KEY, { expiresIn: '5d' })
        const { password, ...other } = user._doc;
        res.status(200).json({...other, accessToken });
    } catch (err) {
        res.status(500).json(err.message);
    }
})




module.exports = router;