const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    tubewell: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tubewell",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Person", personSchema);