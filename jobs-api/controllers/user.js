const User = require("../models/user")

const viewProfile = async (req, res) => {
    res.json({ user: req.user })
}

module.exports = { viewProfile }