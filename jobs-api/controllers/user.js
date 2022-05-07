const User = require("../models/user")

const viewProfile = (req, res) => {
    res.json({ user: req.user })
}

module.exports = { viewProfile }