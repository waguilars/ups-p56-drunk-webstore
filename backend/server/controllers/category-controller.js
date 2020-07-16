const category_model = require('../models/category-model');
const { validationResult } = require('express-validator');

const CategCrt = {};

let order_text = (texto) => {
    let palabras = texto.split(' ');
    palabras.forEach((palabra, idx) => {
        palabras[idx] =
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });
    return palabras.join(' ');
};

CategCrt.insertCategory = (req, res) => {
    let mistakes = validationResult(req);
    if (mistakes.isEmpty()) {
        let body = req.body;
        let param = {
            name: order_text(body.name)
        };
        category_model.find({}, 'name', (err, data) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err
                });
            }
            let flag = data.find(cat => cat.name === param.name);
            if (flag) {
                return res.status(400).json({
                    status: false,
                    msg: "Esta categoria ya se encuentra registrada"
                });
            }
            let new_cat = new category_model(param);
            new_cat.save((err, data) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        error: err
                    });
                }
                return res.status(201).json({
                    status: true,
                    msg: "Categoria registrada",
                    category: data
                });
            })

        });
    } else {
        let new_err = {};
        mistakes.errors.forEach(element => {
            new_err[element.param] = element.msg;
        });
        return res.status(400).json({
            status: false,
            msg: "Parametros no admitidos",
            error: new_err
        });
    }
};

CategCrt.getCategories = (req, res) => {
    category_model.find({}, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err
            });
        }
        res.json({
            status: true,
            categories: data
        });
    });
};

module.exports = CategCrt;