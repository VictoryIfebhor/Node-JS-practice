const express = require("express")
const { createTask, deleteTask, getAllTasks, getSingleTask } = require("../controllers/task")

const router = express.Router()

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getSingleTask).delete(deleteTask)

module.exports = router