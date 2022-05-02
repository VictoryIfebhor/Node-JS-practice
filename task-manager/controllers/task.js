const Task = require("../models/task")
const asyncWrapper = require("../middleware/async-wrapper")
const { createCustomError } = require("../utils/exception")

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getAllTasks = asyncWrapper(async (_, res) => {
    const tasks = await Task.find()
    return res.json(tasks)
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.findById(req.params.id)
    if (!task){
        console.log("No task found")
        return next(createCustomError("Task does not exists", 400))
    }
    return res.json({ task })
})

module.exports = {
    createTask,
    getAllTasks,
    getSingleTask
}