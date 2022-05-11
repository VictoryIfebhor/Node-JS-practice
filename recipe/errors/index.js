class CustomError extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

class CustomFieldError extends CustomError {
    constructor(field, message, statusCode) {
        super(message, statusCode)
        this.field = field
    }
}

const createCustomError = (message, statusCode) => {
    return new CustomError(message, statusCode)
}

const createCustomFieldError = (field, message) => {
    const customError = new CustomFieldError(field, message, 400)
    return customError
}

module.exports = {
    createCustomError,
    createCustomFieldError,
    CustomError,
    CustomFieldError
}