const cart_model = require('../models/cart-model');
const { validationResult } = require('express-validator');
const product_model = require('../models/product-model');

const cartCTR = {};
cartCTR.getCart = (req, res) => {
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
            return res.json({
                status: 200,
                carrito
            });
        });
};

cartCTR.insertAndUpdateCart = (req, res) => {
    let mistakes = validationResult(req);
    if (!(mistakes.isEmpty())) {
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
    let id_producto = req.params.id
    product_model.findById(id_producto, (err, producto) => {
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
        if (producto.stock < req.body.quantity) {
            return res.status(400).json({
                status: false,
                msg: "No hay productos suficientes para cumplir con su pedido",
                err

            });
        }
        cart_model
            .findOne({ user: req.user.user._id })
            .populate('user')
            .populate('items.product', 'name price category')
            .exec((err, cart) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        msg: "Error en el servidor",
                        err
                    });
                }
                let product = {
                    product: req.params.id,
                    quantity: req.body.quantity,
                };
                if (!cart) {

                    let new_cart = new cart_model({
                        items: [product],
                        totalPrice: req.body.quantity * producto.price,
                        user: req.user.user._id,
                    });

                    new_cart.save((err, cart_new) => {
                        if (err) {
                            return res.status(500).json({
                                status: false,
                                msg: 'Error en el servidor',
                                err,
                            });
                        }
                        return res.status(200).json({
                            msg: 'Crear cart',
                            cart_new,
                        });
                    });
                } else {
                    let caritems = cart.items;
                    // console.log(caritems);
                    let flag = caritems.findIndex(car_product =>
                        `${car_product.product._id}` === `${req.params.id}`);
                    if (flag >= 0) {
                        let quantity = parseInt(cart.items[flag].quantity) + parseInt(req.body.quantity);
                        cart.items[flag].quantity = quantity;
                    } else {
                        cart.items.push(product);
                    }

                    let totalPrice = parseFloat(cart.totalPrice);
                    totalPrice += (req.body.quantity * producto.price);
                    cart.totalPrice = totalPrice;
                    cart_model.findByIdAndUpdate(cart._id, cart, { new: true }, (err, guardado) => {
                        if (err) {
                            return res.status(500).json({
                                status: false,
                                msg: 'Error en el servidor',
                                err,
                            });
                        }
                        res.status(200).json({
                            status: true,
                            guardado

                        });
                    });
                }

            });

    });
};


module.exports = cartCTR;