const express = require("express")
const { createTask } = require("../controllers/task")

const router = express.Router()

router.route("/").post(createTask)

module.exports = router