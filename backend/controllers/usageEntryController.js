const UsageEntry = require("../models/UsageEntry");
const Entry = require("../models/UsageEntry");

// 🔧 Helper: convert to minutes
const toMinutes = (hour, minute) => {
  return hour * 60 + minute;
};

// 🔧 Helper: compute duration
const calculateDuration = (
  startHour,
  startMinute,
  endHour,
  endMinute,
  extraCycles
) => {
  const start = toMinutes(startHour, startMinute);
  const end = toMinutes(endHour, endMinute);

  let duration;

  if (end >= start) {
    duration = end - start;
  } else {
    duration = (12 * 60 - start) + end;
  }

  duration += extraCycles * 12 * 60;

  return duration;
};

// 🔧 Helper: convert entry into intervals (for overlap logic)
const getIntervals = (start, end, extraCycles) => {
  const FULL = 12 * 60;
  let intervals = [];

  if (end >= start) {
    intervals.push([start, end]);
  } else {
    // crosses 12 boundary
    intervals.push([start, FULL]);
    intervals.push([0, end]);
  }

  // add extra cycles as full blocks
  for (let i = 0; i < extraCycles; i++) {
    intervals.push([0, FULL]);
  }

  return intervals;
};

// 🔧 Helper: check overlap
const isOverlapping = (newIntervals, existingIntervals) => {
  for (let [ns, ne] of newIntervals) {
    for (let [es, ee] of existingIntervals) {
      if (ns < ee && ne > es) {
        return true;
      }
    }
  }
  return false;
};

// 🚀 CREATE ENTRY
exports.createEntry = async (req, res) => {
  try {
    const {
      person,
      tubewell,
      date,
      startHour,
      startMinute,
      endHour,
      endMinute,
      extraCycles = 0,
      description,
    } = req.body;


    

    // ✅ Basic validation
    if (
      !person ||
      !tubewell ||
      !date ||
      startHour == null ||
      startMinute == null ||
      endHour == null ||
      endMinute == null
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🚨 Validate time range
    if (
      startHour < 1 || startHour > 12 ||
      endHour < 1 || endHour > 12 ||
      startMinute < 0 || startMinute > 59 ||
      endMinute < 0 || endMinute > 59
    ) {
      return res.status(400).json({ message: "Invalid time values" });
    }

    // 🧮 Calculate duration
    const totalMinutes = calculateDuration(
      startHour,
      startMinute,
      endHour,
      endMinute,
      extraCycles
    );

    // ⚠️ Optional warning case (0 duration)
    if (totalMinutes === 0) {
      return res.status(400).json({
        message: "Duration is 0. Add extra cycle if intended.",
      });
    }

    // 🔍 Overlap check
    const start = toMinutes(startHour, startMinute);
    const end = toMinutes(endHour, endMinute);

    const newIntervals = getIntervals(start, end, extraCycles);

    const existingEntries = await UsageEntry.find({
      tubewell,
      date,
    });

    for (let entry of existingEntries) {
      const es = toMinutes(entry.startHour, entry.startMinute);
      const ee = toMinutes(entry.endHour, entry.endMinute);

      const existingIntervals = getIntervals(
        es,
        ee,
        entry.extraCycles
      );

      if(isOverlapping(newIntervals, existingIntervals)) {
        return res.status(400).json({
          message: "Time overlap: Tubewell already in use",
        });
      }
    }

    // ✅ Create entry
    const newEntry = await UsageEntry.create({
      person,
      tubewell,
      date,
      startHour,
      startMinute,
      endHour,
      endMinute,
      extraCycles,
      totalMinutes,
      description,
    });

    res.status(201).json({
      message: "Entry created successfully",
      entry: newEntry,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET ENTRIES =================
exports.getEntries = async (req, res) => {
  try {

    console.log(req.query);
    
    const { tubewellId } = req.query;

    if (!tubewellId) {
      return res.status(400).json({
        message: "tubewellId required",
      });
    }

    const entries = await UsageEntry.find({
      tubewell: tubewellId, // ✅ correct field
    })
      .populate("person") // ✅ correct field
      .populate("tubewell")
      .sort({ createdAt: -1 });

    res.status(200).json(entries);

  } catch (err) {
    console.error("GET ENTRY ERROR:", err);

    res.status(500).json({
      message: "Error fetching entries",
      error: err.message,
    });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const entryId = req.params.id;

    console.log("UPDATE CALLED", entryId);

    const updatedEntry = await UsageEntry.findByIdAndUpdate(
      entryId,
      {
        $set: {
          date: req.body.date,
          startHour: req.body.startHour,
          startMinute: req.body.startMinute,
          endHour: req.body.endHour,
          endMinute: req.body.endMinute,
          description: req.body.description,
          extraCycles: req.body.extraCycles,
        },
      },
      {
        returnDocument: "after", // ✅ FIX (instead of new: true)
      }
    )
      .populate("person")
      .populate("tubewell");

    if (!updatedEntry) {
      return res.status(404).json({
        message: "Entry not found",
      });
    }

    return res.json(updatedEntry);
  } catch (error) {
    console.log("UPDATE ENTRY ERROR:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const entryId = req.params.id;
    console.log("DELETE CALLED:", req.params.id);

    const deletedEntry = await UsageEntry.findByIdAndDelete(entryId);

    if (!deletedEntry) {
      return res.status(404).json({
        message: "Entry not found",
      });
    }

    return res.json({
      message: "Entry deleted successfully",
      id: entryId,
    });
  } catch (error) {
    console.log("DELETE ENTRY ERROR:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};




