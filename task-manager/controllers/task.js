const Task = require("../models/task")
const asyncWrapper = require("../middleware/async-wrapper")

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getAllTasks = asyncWrapper(async (_, res) => {
    const tasks = await Task.find()
    return res.json(tasks)
})


module.exports = {
    createTask,
    getAllTasks
}