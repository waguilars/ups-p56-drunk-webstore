const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'El usuario es necesario'],
    },
    cart: {
        type: Object,
        required: [true, 'El carrito esta vacio'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    payment: {
        type: String,
        default: 'ONLINE',
    },
});

module.exports = mongoose.model('Orden', orderSchema);