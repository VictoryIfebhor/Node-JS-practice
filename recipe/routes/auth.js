const { Router } = require("express")

const { signOutUser, signUpPage, signUpUser, loginPage, loginUser } = require("../controllers/auth")

const router = Router()

router.route("/signup").get(signUpPage).post(signUpUser)
router.route("/login").get(loginPage).post(loginUser)
router.route("/logout").get(signOutUser)

module.exports = router