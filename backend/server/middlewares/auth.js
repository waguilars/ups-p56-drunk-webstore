/* Auth middlewares */
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

// ========================================
//                 Check Token
// ========================================
let checkToken = (req, res, next) => {
  let token = req.get('token');

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: false,
        err: {
          message: 'La sesion ha expirado.',
        },
      });
    }

    req.user = decoded;
    // console.log(decoded);
    // console.log(process.env.TOKEN_EXPIRATION);
    return next();
  });
};

// ========================================
//                 OnlyAdmin
// ========================================

let onlyAdmin = (req, res, next) => {
  let userrole = req.user.user.role;

  if (!(userrole === 'ADMIN_ROLE')) {
    return res.status(401).json({
      status: false,
      msg: 'No tiene permisos para realizar esta accion.',
    });
  }

  return next();
};

module.exports = {
  checkToken,
  onlyAdmin,
};
