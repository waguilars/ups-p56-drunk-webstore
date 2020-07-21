const express = require('express');
const cart_model = require('../models/cart-model');
const { validationResult } = require('express-validator');
const product_model = require('../models/product-model');


const cartCTR = {};

cartCTR.insertCart = (req, res) => {
    let mistakes = validationResult(req);
    if (!mistakes.isEmpty()) {
        let new_err = {};
        mistakes.errors.forEach((element) => {
            let param = element.param;
            let msg_param = element.msg;
            new_err[param] = msg_param;
        });
        return res.status(400).json({
            status: false,
            msg: 'Parametros mal enviados',
            error: new_err,
        });
    }
    product_model.findById(req.params.id, (err, producto) => {
        if (err) {
            return res.status(500).json({
                status: false,
                msg: "Error en el servidor",
                err
            });
        }
        if (!producto) {
            return res.status(404).json({
                status: false,
                msg: "Producto no encontrado",
                err
            });
        }
        cart_model.findOne({ user: req.user.user._id }).populate("Producto")
            .exec((err, cart) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        msg: "Error en el servidor",
                        err
                    });
                }
                if (!cart) {

                    let product = {
                        product: req.params.id,
                        quantity: req.body.quantity
                    }
                    let new_cart = new cart_model({
                        items: [product],
                        // totalPrice: req.body.quantity * producto.price,
                        user: req.user.user._id
                    });
                    new_cart.save((err, cart_new) => {
                        if (err) {
                            return res.status(500).json({
                                status: false,
                                msg: "Error en el servidor",
                                err
                            });
                        }
                        return res.status(200).json({
                            msg: "Crear cart",
                            cart_new
                        });
                    })
                } else {
                    return res.json({
                        cart
                    });
                }
            });
    });
};



module.exports = cartCTR;