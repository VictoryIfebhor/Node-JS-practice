const express = require("express")
const { body } = require("express-validator")

const { getAllVideos, startDownloading, downloadVideo, deleteVideo } = require("../controllers/video")

const router = express.Router()

router.get("/", getAllVideos)
router.post("/", body("youtubeUrl").isURL(), startDownloading)
router.route("/:id").delete(deleteVideo).post(downloadVideo)

module.exports = router