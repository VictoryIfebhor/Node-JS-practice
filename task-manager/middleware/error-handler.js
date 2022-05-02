const { Error: {ValidationError: mongooseValidationError, CastError } } = require("mongoose")
const {CustomError} = require("../utils/exception")

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomError){
        res.status(err.statusCode).json({msg: err.message})
    }
    if (err instanceof mongooseValidationError){
        res.status(400).json({msg: err.message})
    }
    if (err instanceof CastError){
        // Only the first 7 words should be sent. The rest contains information that shouldn't be sent.
        errorMessage = err.message.split(" ").slice(0, 7).join(" ")
        res.status(400).json({msg: errorMessage})
    }
    res.status(500).json({msg: "Internal Server Error"})
}

module.exports = errorHandlerMiddleware