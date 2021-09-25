const mongo = require('mongoose');

const CartSchema = new mongo.Schema([{
    productId = {
        type: String,
    },
    quantity = {
        type: Number,
        default: 1
    }
}], { timestamps: true });



module.exports = mongoose.model('Cart', CartSchema, 'carts')