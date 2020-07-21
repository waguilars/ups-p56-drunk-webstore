const mongoose = require('mongoose');
const categoryModel = require('./category-model');
const { schema } = require('./category-model');

const Schema = mongoose.Schema;

const cartItem = {
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'No se ha seleccionado ningun producto'],
    },
    quantity: {
        type: Number,
        default: 0,
    },
};

const cartSchema = new Schema({
    items: [cartItem],
    totalPrice: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
});

module.exports = mongoose.model('Carrito', cartSchema);