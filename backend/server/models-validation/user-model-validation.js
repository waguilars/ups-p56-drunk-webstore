const { body, check } = require('express-validator');

const validator = {};

validator.password = [
    check('password')
    .isLength({ min: 8 }).withMessage("Contraseña con por lo minimo 8 caracteres")
    .matches(/\d/).withMessage('Contraseña con por lo menos un numero')
];


module.exports = validator;