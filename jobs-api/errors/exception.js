const { StatusCodes } = require("http-status-codes")

class CustomHttpError extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (message, statusCode) => {
    return new CustomHttpError(message, statusCode)
}

const invalidCredentials = createCustomError("Invalid Credentials", StatusCodes.UNAUTHORIZED)
const unauthenticated = createCustomError("Not Authenticated", StatusCodes.UNAUTHORIZED)


module.exports = {
    createCustomError,
    CustomHttpError,
    invalidCredentials,
    unauthenticated
}