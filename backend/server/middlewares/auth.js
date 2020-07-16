/* Auth middlewares */
const jwt = require('jsonwebtoken');

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

module.exports = {
  checkToken,
};
