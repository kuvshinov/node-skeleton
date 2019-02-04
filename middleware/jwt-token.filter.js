const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
    const authExp = /^Bearer$/i;
    const authHeader = req.header('Authorization') + '';
    const parts = authHeader.split(' ');

    if (parts.length === 2 && authExp.test(parts[0])) {
        //verify token
        jwt.verify(parts[1],  config.secret, function(err, decoded) {
            if (err) {
                next({ status: 401, message: 'Failed to authenticate token.' });
            } else {
                // if everything good, save to request for use in other routes
                req.userId = decoded.id;
                next();
            }
        });
    } else {
        next({status: 401, message: "No token provided"});
    }
};