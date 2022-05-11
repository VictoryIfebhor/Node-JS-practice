const { Error: { ValidationError } } = require("mongoose")
const { CustomFieldError } = require("../errors")

const errorHandler = (error, req, res, next) => {
    let errors = {}
    if (error instanceof CustomFieldError) {
        errors[error.field] = error.message
    }
    else if (error.code === 11000){
        errors = {email: "Email already registered"}
    } else if (error instanceof ValidationError) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    
    return res.status(400).json({ errors })
}

module.exports = errorHandler