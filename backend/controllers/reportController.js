// const Entry = require("../models/UsageEntry");

// exports.getReport = async (req, res) => {
//   try {
//     const { tubewellId } = req.query;

//     if (!tubewellId) {
//       return res.status(400).json({ error: "tubewellId required" });
//     }

//     const entries = await Entry.find({
//       tubewell: tubewellId   // ✅ FIXED
//     }).populate("person");   // ✅ FIXED

//     const report = {};

//     entries.forEach(e => {

//       if (!e.person) return; // safety

//       const id = e.person._id.toString();

//       if (!report[id]) {
//         report[id] = {
//           name: e.person.name, // ✅ FIXED
//           entries: [],
//           totalHours: 0
//         };
//       }

//       const hours = Number(e.totalHours || 0);

//       report[id].entries.push({
//         date: e.date,
//         start: e.startTime,
//         end: e.endTime,
//         hours
//       });

//       report[id].totalHours += hours;
//     });

//     // ✅ round totals
//     Object.values(report).forEach(p => {
//       p.totalHours = Number(p.totalHours.toFixed(2));
//     });

//     res.json(report);

//   } catch (err) {
//     console.error("REPORT ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// };