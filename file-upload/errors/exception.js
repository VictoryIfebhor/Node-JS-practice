class CustomHttpError extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (message, statusCode) => {
    return new CustomHttpError(message, statusCode)
}

module.exports = {
    createCustomError,
    CustomHttpError
}