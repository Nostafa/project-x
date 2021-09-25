const express = require('express');
const mongoose = require('mongoose')
const app = express();

// to active .env
const dotenv = require('dotenv');
dotenv.config();


// the connection point between router and index file
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');



// connect mongo
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('your dataBase is ruining')
    })
    .catch(err => {
        console.log(err.message)
    })

//to add path of router
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// run node server
app.listen(process.env.PORT || 5000, '127.0.0.1', () => {
    console.log(`server is ruining on port ${process.env.PORT || 5000}`)
});