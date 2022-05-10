const { Router } = require("express")

const { signUpPage, signUpUser, loginPage, loginUser } = require("../controllers/auth")

const router = Router()

router.route("/signup").get(signUpPage).post(signUpUser)
router.route("/login").get(loginPage).post(loginUser)

module.exports = router