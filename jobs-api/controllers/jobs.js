const Job = require("../models/jobs")
const { StatusCodes } = require('http-status-codes')
const { createCustomError } = require("../errors/exception")

const noJobFound = createCustomError("No such job exists", StatusCodes.BAD_REQUEST)

const createJob = async (req, res) => {
    const job = await Job.create({ ...req.body, createdBy: req.user._id })
    res.status(StatusCodes.CREATED).json({ job })
}

const getJob = async (req, res) => {
    const userId = req.user._id
    const jobId = req.params.id
    const job = await Job.findOne({_id: jobId, createdBy: userId})
    if (!job) {
        throw noJobFound
    }
    res.json({ job })
}

const getJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user._id}).sort("createdAt")
    res.json({ jobs })    
}

const deleteJob = async (req, res) => {
    const jobId = req.params.id
    const userId = req.user._id
    const job = await Job.findOneAndDelete({_id: jobId, createdBy: userId})
    if (!job) {
        throw noJobFound
    }
    res.json({msg: `Successfully deleted ${job.title} for ${job.company}`})
}

const updateJob = async (req, res) => {
    const jobId = req.params.id
    const userId = req.user._id
    const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId}, req.body, {
        new: true,
        runValidators: true
    })
    if (!job) {
        throw noJobFound
    }
    res.json({ job })
}

module.exports = { createJob, getJob, getJobs, deleteJob, updateJob }