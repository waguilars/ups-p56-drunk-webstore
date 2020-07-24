const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

const product_model = require('../models/product-model');

const prodCtr = {};

let order_text = (texto) => {
    let palabras = texto.split(' ');
    palabras.forEach((palabra, idx) => {
        palabras[idx] =
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });
    return palabras.join(' ');
};

let order_text_description = (texto) => {
    let palabras = texto.split(' ');
    palabras.forEach((palabra, idx) => {
        if (idx === 0) {
            palabras[idx] =
                palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
        } else {
            palabras[idx] =
                palabra.charAt(0).toLowerCase() + palabra.slice(1).toLowerCase();
        }
    });
    return palabras.join(' ');
};

prodCtr.insertProduct = (req, res) => {
    let mistakes = validationResult(req);
    if (mistakes.isEmpty()) {
        let body = req.body;
        let param = {
            name: order_text(body.name),
            desc_short: order_text_description(body.desc_short),
            desc_long: order_text_description(body.desc_long),
            price: body.price,
            category: body.category,
            img: body.img,
            stock: body.stock,
        };
        product_model.find({}, 'name', (err, data) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            }
            let flag = data.find((prod) => prod.name === param.name);
            if (flag) {
                return res.status(400).json({
                    status: false,
                    msg: 'Este producto ya se encuentra registrado ',
                });
            }
            let new_prod = new product_model(param);
            new_prod.save((err, data) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        error: err,
                    });
                }
                res.status(201).json({
                    status: true,
                    msg: 'Producto registrado',
                    product: data,
                });
            });
        });
    } else {
        let new_err = {};
        mistakes.errors.forEach((element) => {
            new_err[element.param] = element.msg;
        });
        return res.status(400).json({
            status: false,
            msg: 'Parametros no admitidos',
            error: new_err,
        });
    }
};

prodCtr.getProducts = (req, res) => {
    product_model.find({}, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: false,
                msg: err,
            });
        }
        res.status(201).json({
            status: true,
            product: data,
        });
    });
};

prodCtr.getproduct = (req, res) => {
    let id = req.params.id;
    product_model
        .findById(id)
        .populate('category')
        .exec((err, data) => {
            if (err) {
                return res.status(404).json({
                    status: false,
                    msg: 'producto no encontrado',
                });
            }
            res.status(200).json({
                status: true,
                product: data,
            });
        });
};

prodCtr.defineImage = (req, res) => {
    let fileName = req.params.name;

    let imagePath = path.resolve(
        __dirname,
        `../../uploads/images/products/${fileName}`
    );

    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        let noImagePath = path.resolve(
            __dirname,
            '../../public/assets/img/defaultProduct.png'
        );
        res.sendFile(noImagePath);
    }
};

prodCtr.updateProduct = (req, res) => {
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
            msg: 'parametros no admitidos',
            error: new_err,
        });
    }
    let id = req.params.id;
    let body = req.body;
    product_model.findByIdAndUpdate(id, body, { new: true }, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: false,
                msg: 'error en el servidor',
                error: {
                    err,
                },
            });
        }
        if (data.length === 0) {
            return res.status(404).json({
                status: false,
                msg: 'producto no encontrado',
                error: err,
            });
        }
        return res.status(200).json({
            status: true,
            msg: 'Producto Actualizado',
            data,
        });
    });
};

prodCtr.getProductsCategory = (req, res) => {
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
            msg: 'parametros no admitidos',
            error: new_err,
        });
    }
    let id = req.params.id;
    product_model.find({ category: id }, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: false,
                msg: 'Error en el servidor',
                error: {
                    err,
                },
            });
        }
        // console.log(data);
        if (data.length === 0) {
            return res.status(500).json({
                status: false,
                msg: 'Cateogoria no registrada',
                error: {
                    err,
                },
            });
        }
        res.status(200).json({
            status: true,
            msg: `Productos de esta categoria`,
            products: data,
        });
    });
};

prodCtr.getLast = async(req, res) => {
    const limit = +req.query.limit || 5;
    const page = +req.query.page || 1;

    const lastProds = await product_model.paginate({}, { limit, page, populate: 'category', sort: { updatedAt: 'desc' } });

    res.json({
        status: true,
        data: lastProds,
    });
};

//find a token 
prodCtr.findToken = (req, res) => {
    let token = req.params.token;
    // console.log(token);
    product_model.find({
            $or: [
                { name: { $regex: token, $options: 'i' } },
                { desc_short: { $regex: token, $options: 'i' } },
                { desc_long: { $regex: token, $options: 'i' } }
            ]
        })
        .exec((err, product) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    msg: 'error en el servidor',
                    error: {
                        err,
                    },
                });
            }
            if (product.length === 0) {
                return res.status(404).json({
                    status: false,
                    msg: 'No se encontraron coincidencias',
                    err
                });
            }

            return res.status(200).json({
                status: true,
                msg: 'se encontro el token ',
                productos: product
            });
        });
};

module.exports = prodCtr;