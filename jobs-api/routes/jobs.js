const express = require('express')

const { getJobs, getJob, deleteJob, updateJob, createJob } = require("../controllers/jobs")

const router = express.Router()

router.route("/").get(getJobs).post(createJob)
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router