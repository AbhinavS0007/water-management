const UsageEntry = require("../models/UsageEntry");
const Person = require("../models/Person");

exports.getAllBills = async (req, res) => {
    try {
      const { hourlyRate } = req.query;

      console.log("🔥 BILL API HIT");
console.log("QUERY:", req.query);
  
      if (!hourlyRate) {
        return res.status(400).json({
          message: "hourlyRate required",
        });
      }
  
      const persons = await Person.find();

  
      const result = [];
      let totalMoney = 0
  
      for (let person of persons) {
        const entries = await UsageEntry.find({
          person: person._id,
        }).populate("tubewell");
  
        let totalMinutes = 0;
  
        const formattedEntries = entries.map((entry) => {
          totalMinutes += entry.totalMinutes;
  
          const hours = entry.totalMinutes / 60;
          const amount = hours * Number(hourlyRate);
  
          return {
            date: entry.date,
            tubewell: entry.tubewell?.name || "N/A",
            start: `${entry.startHour}:${String(entry.startMinute).padStart(2, "0")}`,
            end: `${entry.endHour}:${String(entry.endMinute).padStart(2, "0")}`,
            hours: hours,   // keep number
            amount: amount,
          };
        });
  
        const totalHours = totalMinutes / 60;
        const totalAmount = totalHours * Number(hourlyRate);

        totalMoney += totalAmount
  
        result.push({
          person: person.name,
          entries: formattedEntries,
          totalHours,
          totalAmount,
        });
      }

      console.log("totalMoney - ", totalMoney);
    //   console.log("FINAL RESPONSE:", {
    //     totalMoney,
    //     hourlyRate,
    //     bills: result.length,
    //   });

  
      return res.json({
        totalMoney: Math.round(totalMoney),
        hourlyRate,
        bills: result,
        
      });
  
    } catch (error) {
      console.log("ERROR:", error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  };