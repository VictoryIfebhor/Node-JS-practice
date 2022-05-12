const { Error: {ValidationError, CastError} } = require("mongoose")
const { CustomHttpError } = require("../errors/exception")

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomHttpError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    if (err instanceof ValidationError){
        const msg = Object.values(err.errors).map(item => item.message).join(", ")
        return res.status(400).json({ msg })
    }
    if (err instanceof CastError && err.path === "_id"){

        msg = `Record does not exist for id: ${err.value}`
        return res.status(404).json({ msg })
    }
    if (err.code && err.code === 11000) {
        return res.status(400).json({msg: `${Object.keys(err.keyValue)} already exists. Choose something else`})
    }
    return res.status(500).json({msg: "Internal Server Error"})
}

module.exports = errorHandlerMiddleware