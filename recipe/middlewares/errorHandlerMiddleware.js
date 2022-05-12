const { Error: { ValidationError } } = require("mongoose")
const { CustomFieldError } = require("../errors")

const errorHandler = (error, req, res, next) => {
    console.log(error)
    let errors = {}
    if (error instanceof CustomFieldError) {
        errors[error.field] = error.message
        return res.status(400).json({ errors })
    }
    if (error.code === 11000) {
        errors = {email: "Email already registered"}
        return res.status(400).json({ errors })
    } if (error instanceof ValidationError) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
        return res.status(400).json({ errors })
    }
    return res.status(500).json({ errors: { general: "Internal Server Error. Try again later or contact developer"} })
}

module.exports = errorHandler