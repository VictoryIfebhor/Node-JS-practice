const { Error: {ValidationError: mongooseValidationError} } = require("mongoose")
const {CustomError} = require("../utils/exception")

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomError){
        res.status(err.statusCode).json({msg: err.message})
    }
    if (err instanceof mongooseValidationError){
        res.status(400).json({msg: err.message})
    }
    res.status(500).json({msg: "Internal Server Error"})
}

module.exports = errorHandlerMiddleware