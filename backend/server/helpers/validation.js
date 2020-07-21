const { check, param } = require('express-validator');
const { exists } = require('../models/user-model');

const validator = {};

validator.password = check('password').exists();
// .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
// .withMessage("La constraseña debe tener al menos 8 caracteres incluyendo uno en mayuscula,un numero y sin caracteres especiales ")

validator.name = check('name')
    .exists()
    .matches(/^[A-ZÑa-zñ]+$/)
    .withMessage('Es necesario el nombre y este  no debe incluir numeros ni caracteres especiales');

validator.lastname = check('lastname')
    .exists()
    .withMessage('es necesario el apellido')
    .matches(/^[A-ZÑa-zñ]+$/)
    .withMessage('Es necesario el apellido y este no debe incluir numeros ni caracteres especiales');

validator.email = check('email')
    .exists()
    .isEmail()
    .withMessage('El correo ingresado es invalido');

validator.desc_short = check('desc_short')
    .exists()
    .isLength({ min: 1, max: 200 })
    .withMessage("Es necesario una descripción corta del producto ( maximo 200 caracteres)");
validator.desc_long = check('desc_long')
    .exists()
    .isLength({ min: 5, max: 600 })
    .withMessage("Es necesario una descripcion del producto (maximo 600 caracteres)");

validator.price = check('price')
    .exists()
    .isFloat()
    .withMessage("Es necesario ingresar un precio a demas este debe ser un numero decimal");

validator.stock = check('stock')
    .exists()
    .isNumeric()
    .withMessage("Es necesario ingresar el numero de productos disponibles");

validator.name_prod = check('name')
    .exists()
    .isLength({ min: 1 })
    .withMessage("Es necesario introducir el nombre del producto")

validator.category = check('category')
    .isMongoId()
    .withMessage("Es necesario elegir una categoria valida");

validator.param_id = param('id')
    .isMongoId()
    .withMessage("Id no valido");

validator.quantity = check('quantity')
    .isNumeric()
    .withMessage("El valor ingresado debe ser un numero");
module.exports = validator;