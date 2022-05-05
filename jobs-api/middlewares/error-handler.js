const { Error: {ValidationError, CastError} } = require("mongoose")
const { CustomHttpError } = require("../errors/exception")

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomHttpError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    if (err instanceof ValidationError){
        return res.status(400).json({msg: err.message})
    }
    if (err instanceof CastError){
        // Only the first 7 words should be sent. The rest contains information that shouldn't be sent.
        errorMessage = err.message.split(" ").slice(0, 7).join(" ")
        return res.status(400).json({msg: errorMessage})
    }
    return res.status(500).json({msg: "Internal Server Error"})
}

module.exports = errorHandlerMiddleware