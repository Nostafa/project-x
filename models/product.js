const mongo = require('mongoose');

const ProductSchema = new mongo.Schema({
    title = {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img = {
        type: String,
        required: true,
    },
    category = {
        type: Array,
        required: true
    },
    size = {
        type: String || Number,
        required: true
    },
    color = {
        type: String,
        required: true
    },
    price = {
        type: Number,
        required: true
    }

}, { timestamps: true });



module.exports = mongoose.model('Product', ProductSchema, 'products')