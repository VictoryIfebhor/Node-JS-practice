const express = require("express")
const { createTask, getAllTasks, getSingleTask } = require("../controllers/task")

const router = express.Router()

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getSingleTask)

module.exports = router