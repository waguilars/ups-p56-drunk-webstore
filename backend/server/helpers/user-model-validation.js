const { body, check } = require('express-validator');

const validator = {};

validator.password = check('password').exists();
// .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
// .withMessage("La constraseña debe tener al menos 8 caracteres incluyendo uno en mayuscula,un numero y sin caracteres especiales ")

validator.name = check('name')
  .exists()
  .matches(/^[A-Za-z ]+$/)
  .withMessage('El nombre no debe incluir numeros ni caracteres especiales');

validator.lastname = check('lastname')
  .exists()
  .withMessage('es necesario el apellido')
  .matches(/^[A-Za-z ]+$/)
  .withMessage('El apellido no debe incluir numeros ni caracteres especiales');

validator.email = check('email')
  .exists()
  .isEmail()
  .withMessage('El correo ingresado es invalido');

module.exports = validator;
