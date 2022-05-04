const { CustomError } = require("../utils/exception")

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg: "Internal Server Error"})
}

module.exports = errorHandlerMiddleware