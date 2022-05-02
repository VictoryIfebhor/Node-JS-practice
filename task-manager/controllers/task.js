const Task = require("../models/task")
const asyncWrapper = require("../middleware/async-wrapper")
const { createCustomError } = require("../utils/exception")

const taskNotFound = createCustomError("Task does not exists", 400)

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    return res.status(201).json({ task })
})

const getAllTasks = asyncWrapper(async (_, res) => {
    const tasks = await Task.find()
    return res.json(tasks)
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.findById(req.params.id)
    if (!task){
        return next(taskNotFound)
    }
    return res.json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
    const deletedTask = await Task.findByIdAndDelete(req.params.id)
    if (!deletedTask){
        return next(taskNotFound)
    }
    return res.json({msg: `Successfully deleted ${deletedTask.name}`})
})

module.exports = {
    createTask,
    deleteTask,
    getAllTasks,
    getSingleTask
}