const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({

  name: {
    type: String,
    requried: true,
  },
  description: {
    type: String,
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    }
  ]

});

module.exports = mongoose.model("Tag", tagSchema);