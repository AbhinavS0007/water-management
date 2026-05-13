const Tubewell = require("../models/Tubewell");
const UsageEntry = require("../models/UsageEntry");
const Person = require("../models/Person");

// ➕ Create Tubewell
exports.createTubewell = async (req, res) => {
  try {
    let { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    name = name.trim();

    const existing = await Tubewell.findOne({ name });

    if (existing) {
      return res.status(200).json({
        message: "Tubewell already exists",
        tubewell: existing,
      });
    }

    const tubewell = await Tubewell.create({ name });

    res.status(201).json({
      message: "Tubewell created",
      tubewell,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📄 Get All Tubewells
exports.getTubewells = async (req, res) => {
  try {
    const tubewells = await Tubewell.find().sort({ createdAt: 1 });

    res.status(200).json(tubewells);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTubewell = async (req, res) => {
  try {
    const { id } = req.params;

    // DELETE TUBEWELL
    const deletedTubewell =
      await Tubewell.findByIdAndDelete(id);

    if (!deletedTubewell) {
      return res.status(404).json({
        success: false,
        message: "Tubewell not found",
      });
    }

    // DELETE RELATED PERSONS
    await Person.deleteMany({
      tubewell: id,
    });

    // DELETE RELATED ENTRIES
    await UsageEntry.deleteMany({
      tubewell: id,
    });

    res.status(200).json({
      success: true,
      message:
        "Tubewell and related data deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};