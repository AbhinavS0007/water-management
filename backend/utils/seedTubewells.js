const Tubewell = require("../models/Tubewell");

const seedTubewells = async () => {
  try {
    const count = await Tubewell.countDocuments();

    if (count === 0) {
      await Tubewell.insertMany([
        { name: "Tubewell 1" },
        { name: "Tubewell 2" },
      ]);

      console.log("✅ Default tubewells created");
    }
  } catch (error) {
    console.error("❌ Error seeding tubewells:", error);
  }
};

module.exports = seedTubewells;