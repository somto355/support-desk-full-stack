const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            // We use .split to turn the word 'Bearer Token' into an array and we want the value of index 1 which will be the token itself
                // Verify token
            // .verify takes two things (The token and the secrete which we have in environment variables)
            // This gives us a decoded token that has the user id in it
            token = req.headers.authorization.split(' ')[1]

        
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from token
            // Use the User Model
            // .select('-password') is used to exclude the password because we don't want to get that
            req.user = await User.findById(decoded.id).select('-password')

            // Call whatever the next middleware is
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    // Outside the if statement, check if there's no token
    if(!token){
        res.status(401)
        throw new Error('Not authorized')
    }
})

module.exports = { protect }


