const jwt = require('jsonwebtoken');
let User = require('../models/users/User');
exports.userAuth = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (token) {
                console.log(token)
                const decode = await jwt.verify(token, process.env.JWT_SECRET)
                console.log(decode)
                let user = await User.findByPk(decode.id)
                console.log(user)
                if (user) {
                    req.user = user
                    // req.role = decode.role
                    next();
                } else {
                    res.status(401).json({
                        staus: false,
                        message: 'Not authorized to access this route'
                    })
                }
            } else {
                res.status(401).json({
                    staus: false,
                    message: 'Not authorized to access this route'
                })
            }
        } else {
            res.status(401).json({
                staus: false,
                message: 'Not authorized to access this route'
            })
        }
    } catch (err) {
        res.status(401).json({
            staus: false,
            error: err.message,
            message: 'Not authorized to access this route'
        })
    }
}