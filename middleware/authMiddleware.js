import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    const secret = process.env.TokenSecret;

    // Check if json web token exists & is verified
    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

// Check current user
export const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    const secret = process.env.TokenSecret;

    if(token) {
        jwt.verify(token, secret, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}
