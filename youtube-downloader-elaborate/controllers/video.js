const fs = require("fs/promises")
const { validationResult } = require("express-validator")

const Video = require("../models/video")

const getAllVideos = async (req, res) => {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).send(videos);
}

const downloadVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      res.status(404).send("Video not found");
    }
    const { file } = video;

    res.status(200).download(file);
}

const deleteVideo = async (req, res) => {
    const { id } = req.params;

    const video = await Video.findByIdAndDelete(id);

    if (video) {
      await fs.unlink(video.file);
    }
    res.status(200).send(video);
}

const startDownloading = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { youtubeUrl } = req.body;
        await downloadQueue.add({ youtubeUrl });
        res.status(200).send("Downloading");
    } catch (error) {
        throw error;
    }
}

module.exports = { getAllVideos, downloadVideo, deleteVideo, startDownloading }