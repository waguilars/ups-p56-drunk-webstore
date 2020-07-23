const cart_model = require('../models/cart-model');
const { validationResult } = require('express-validator');
const product_model = require('../models/product-model');

const cartCTR = {};
cartCTR.getCart = (req, res) => {
    let user_id = req.user.user._id;
    cart_model
        .findOne({ user: user_id })
        .populate('user')
        .populate('items.product', 'name price category img')
        .exec((err, carrito) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    msg: 'Error en el servidor',
                    err,
                });
            }

            if (!carrito) {
                return res.status(404).json({
                    status: false,
                    msg: 'El carrito se encuentra vacio',
                    err,
                });
            }
            let cantidad = carrito.items;
            let cantidades = [];
            cantidad.forEach((cant) => {
                cantidades.push(parseInt(cant.quantity));
            });
            let total = cantidades.reduce((a, b) => a + b, 0);
            let new_cart = {
                totalPrice: carrito.totalPrice,
                _id: carrito._id,
                items: carrito.items,
                total,
                user: carrito.user,
            };
            return res.json({
                status: 200,
                carrito: new_cart,
            });
        });
};

cartCTR.insertAndUpdateCart = (req, res) => {
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
    let id_producto = req.params.id;
    product_model.findById(id_producto, (err, producto) => {
        if (err) {
            return res.status(500).json({
                status: false,
                msg: 'Error en el servidor',
                err,
            });
        }
        if (!producto) {
            return res.status(404).json({
                status: false,
                msg: 'Producto no encontrado',
                err,
            });
        }
        if (producto.stock < req.body.quantity) {
            return res.status(400).json({
                status: false,
                msg: 'No hay productos suficientes para cumplir con su pedido',
                err,
            });
        }
        cart_model
            .findOne({ user: req.user.user._id })
            .populate('user')
            .populate('items.product', 'name price category img')
            .exec((err, cart) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        msg: 'Error en el servidor',
                        err,
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
                        let carrito = {
                            totalPrice: cart_new.totalPrice,
                            _id: cart_new._id,
                            items: cart_new.items,
                            user: cart_new.user,
                            total: req.body.quantity,
                        };
                        // console.log(cart_new);
                        return res.status(200).json({
                            msg: 'Producto ingresado al carrito',
                            carrito,
                        });
                    });
                } else {
                    let caritems = cart.items;
                    // console.log(caritems);
                    let flag = caritems.findIndex(
                        (car_product) => `${car_product.product._id}` === `${req.params.id}`
                    );
                    if (flag >= 0) {
                        let quantity =
                            parseInt(cart.items[flag].quantity) + parseInt(req.body.quantity);
                        cart.items[flag].quantity = quantity;
                    } else {
                        cart.items.push(product);
                    }

                    let totalPrice = parseFloat(cart.totalPrice);
                    totalPrice += req.body.quantity * producto.price;
                    cart.totalPrice = totalPrice;
                    cart_model.findByIdAndUpdate(
                        cart._id,
                        cart, { new: true },
                        (err, guardado) => {
                            if (err) {
                                return res.status(500).json({
                                    status: false,
                                    msg: 'Error en el servidor',
                                    err,
                                });
                            }
                            let cantidad = guardado.items;
                            let cantidades = [];
                            cantidad.forEach((cant) => {
                                cantidades.push(parseInt(cant.quantity));
                            });
                            let total = cantidades.reduce((a, b) => a + b, 0);
                            let carrito = {
                                totalPrice: guardado.totalPrice,
                                _id: guardado._id,
                                items: guardado.items,
                                user: guardado.user,
                                total: total,
                            };
                            // console.log(carrito);
                            res.status(200).json({
                                status: true,
                                carrito,
                            });
                        }
                    );
                }
            });
    });
};


cartCTR.emptyCart = (req, res) => {
    let user_id = req.user.user._id
    cart_model.findOne({ user: user_id }).exec((err, carrito) => {
        if (err) {
            return res.status(500).json({
                status: false,
                msg: 'Error en el servidor',
                err,
            });
        }
        if (!carrito) {
            return res.status(404).json({
                status: false,
                msg: "Actualmente el carrito esta vacio",
                err
            });
        }
        let id_cart = carrito._id;
        cart_model.findByIdAndDelete(id_cart, (err, eliminado) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    msg: 'Error al vaciar el carrito',
                    err,
                });
            }
            return res.status(200).json({
                status: true,
                msg: "el carrito ha sido vaciado"
            });
        });
    });
};

module.exports = cartCTR;