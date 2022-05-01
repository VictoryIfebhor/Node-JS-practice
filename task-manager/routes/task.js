const express = require("express")
const { createTask, getAllTasks } = require("../controllers/task")

const router = express.Router()

router.route("/").get(getAllTasks).post(createTask)

module.exports = router