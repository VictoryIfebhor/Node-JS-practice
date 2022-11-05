const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      file: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
      },
},{ timestamps: true });

module.exports = new mongoose.model("Video", videoSchema);