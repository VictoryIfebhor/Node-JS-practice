const express = require("express")

const { viewProfile } = require("../controllers/user")

const router = express.Router()

router.route("/me").get(viewProfile)

module.exports = router