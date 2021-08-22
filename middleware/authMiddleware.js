const jwt = require("jsonwebtoken")
const User = require('../models/User');
const requireAuth = ((req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "secret key", (err, decoded) => {
            if (err) {
                console.log(err)
                res.render("login", { error: false })
            } else {
                next()
            }
        })
    }
    else {
        res.render("login", { error: false })
    }
})

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "secret key", async (err, decoded) => {
            if (err) {
                res.locals.user = false;
                next();
            } else {
                let user = await User.findById(decoded.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = false;
        next();
    }
};

module.exports = { requireAuth, checkUser }