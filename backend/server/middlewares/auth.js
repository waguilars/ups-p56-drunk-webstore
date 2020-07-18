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

let checkrole = (req, res, next) => {
    let userrole = req.user.user.role
    if (!(userrole === 'ADMIN_ROLE')) {
        return res.status(403).json({
            status: false,
            msg: "Acceso denegado para este usuuario"
        });
    }

    return next();
}

let checkparams = (req, res, next) => {
    let body = req.body;
    let id = req.params.id;
    let userrole = req.user.user.role;
    if (id && !(userrole === 'ADMIN_ROLE')) {
        return res.status(403).json({
            status: false,
            msg: "Acceso denegado"
        });
    }
    if (!(userrole === 'ADMIN_ROLE')) {
        body.role = req.user.user.role
        body.status = req.user.user.status;
    }
    req.body = body
    return next();
}


module.exports = {
    checkToken,
    checkrole,
    checkparams
};