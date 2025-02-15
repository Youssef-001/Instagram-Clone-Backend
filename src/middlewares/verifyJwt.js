const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError.js');
require('dotenv').config();


function verifyJWT (req,res,next) 
{
    const authHeader = req.headers['authorization'];
    if (!authHeader)
    {
        throw new AppError("Unauthorized", 401);
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if (err)
        {
            throw new AppError("Unauthorized", 401);
        }

        req.user = user;
        next();
    })
}

module.exports = verifyJWT;