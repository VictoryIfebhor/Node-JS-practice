const Task = require("../models/task")

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createTask
}