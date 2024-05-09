import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { constants } from '../constants.js';


export const validateToken = expressAsyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.AUTHORIZATION || req.headers.Authorization;
    if(!authHeader){
        res.status(constants.UNAUTHORIZED)
        throw new Error("Unauthorized")
    }
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
            if (err) {
                res.status(constants.UNAUTHORIZED);
                throw new Error("User is not Authorized");
            }
            req.user = decoded.user;
            next();
        });

        if (!token) {
            res.status(constants.UNAUTHORIZED);
            throw new Error("User is unauthorized or token missing");
        }
    }
});