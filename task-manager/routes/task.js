const express = require("express")
const { createTask, deleteTask, getAllTasks, getSingleTask, updateTask } = require("../controllers/task")

const router = express.Router()

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getSingleTask).delete(deleteTask).patch(updateTask)

module.exports = router