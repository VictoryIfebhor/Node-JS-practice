const express = require("express")

const router = express.Router()

router.get("/", (req, res) => res.render(req.params.page))

module.exports = router