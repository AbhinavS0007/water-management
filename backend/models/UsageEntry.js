const mongoose = require("mongoose");

const usageEntrySchema = new mongoose.Schema(
  {
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },

    tubewell: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tubewell",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    // ⏱ Raw Time Input
    startHour: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    startMinute: {
      type: Number,
      required: true,
      min: 0,
      max: 59,
    },

    endHour: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    endMinute: {
      type: Number,
      required: true,
      min: 0,
      max: 59,
    },

    extraCycles: {
      type: Number,
      default: 0, // each = +12 hours
      min: 0,
    },

    // 🧮 Computed Value
    totalMinutes: {
      type: Number,
      required: true,
    },

    // 📝 Notes
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UsageEntry", usageEntrySchema);