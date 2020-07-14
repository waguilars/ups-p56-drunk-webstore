const { body, check } = require('express-validator');

const validator = {};

validator.password = check("password")
    .exists().withMessage("es necesaria la contraseña")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage("La constrasela debe tener al menos un carater en mayuscula,un numero y sin caracteres especiales ")

validator.name = check('name')
    .exists().withMessage("Es necesario el nombre")
    .matches(/^[A-Za-z ]+$/).withMessage("El nombre no debe incluir numeros ni caracteres especiales")

validator.lastname = check('lastname')
    .exists().withMessage("es necesario el apellido")
    .matches(/^[A-Za-z ]+$/).withMessage("El nombre no debe incluir numeros ni caracteres especiales")

validator.email = check('email')
    .exists().withMessage("es necesario el correo")
    .isEmail().withMessage("El correo ingresado es invalido")

module.exports = validator;