const express = require('express');
const order_model = require('../models/order-model');
const cart_model = require('../models/cart-model');

const orderCTR = {};

orderCTR.insertOrder = (req, res) => {
    let user_id = req.user.user._id;
    cart_model.findOne({ user: user_id })
        .populate('user')
        .populate('items.product', 'name price category')
        .exec((err, carrito) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    msg: "Error en el servidor",
                    err
                });
            }
            if (!carrito) {
                return res.status(404).json({
                    status: false,
                    msg: "El carrito se encuentra vacio",
                    err
                });
            }

            let total = carrito.totalPrice;
            let new_products = []
            carrito.items.forEach(producto => {
                let insertar = {
                    name: producto.product.name,
                    price: producto.product.price,
                    quantity: producto.quantity
                };
                new_products.push(insertar);
            });
            let cart = {
                products: new_products,
                totalprice: total
            };

            new_order = new order_model({ user: user_id, cart });
            new_order.save((err, guardado) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        msg: "Error en la orden no se pudo realizar la orden",
                        err
                    });
                }
                let carrito_id = carrito._id
                cart_model.findByIdAndDelete(carrito_id, { items: [], totalPrice: 0 }, (err, eliminado) => {
                    if (err) {
                        return res.status(500).json({
                            status: false,
                            msg: "Error en el carrito no se pudo vaciar",
                            err
                        });
                    }
                    let productos = new_order.cart.products;
                    let payment = {
                        user: `${carrito.user.name} ${carrito.user.lastname}`,
                        products: productos,
                        totalPrice: new_order.cart.totalprice,
                        date: new_order.date
                    };
                    return res.status(201).json({
                        status: true,
                        msg: "Compra realizada con exito",
                        order: payment
                    });
                });
            });
        });
}

orderCTR.getOrders = (req, res) => {
    let user_id = req.user.user._id;
    order_model.find({ user: user_id }).exec((err, order) => {
        if (err) {
            return res.status(500).json({
                status: false,
                msg: "Error en el servidor",
                err
            });
        }
        if (!order) {
            return res.status(404).json({
                status: false,
                msg: "El usuario no ha realizado ninguna compra",
                err
            });
        }
        return res.json({
            status: true,
            msg: "Ordenes realizadas por el usuario",
            order
        });
    });
};

module.exports = orderCTR