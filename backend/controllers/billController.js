const UsageEntry = require("../models/UsageEntry");
const Person = require("../models/Person");

exports.getAllBills = async (req, res) => {
    try {
        const { hourlyRate } = req.query;

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

            



            const formattedEntries = entries
                .filter(entry => entry.isPaid === false)
                .map((entry) => {
                    totalMinutes += entry.totalMinutes;
                    const hours = entry.totalMinutes / 60;
                    const amount = hours * Number(hourlyRate);

                    return {
                        entryId: entry._id,
                        date: entry.date,
                        isPaid: entry.isPaid,
                        tubewell: entry.tubewell?.name || "N/A",
                        start: `${entry.startHour}:${String(entry.startMinute).padStart(2, "0")}`,
                        end: `${entry.endHour}:${String(entry.endMinute).padStart(2, "0")}`,
                        hours: hours,
                        amount: amount,
                    };
                });

            const totalHours = totalMinutes / 60;
            const totalAmount = totalHours * Number(hourlyRate);

            totalMoney += totalAmount

        

            result.push({
                personId: person._id,
                person: person.name,
                entries: formattedEntries,
                totalHours,
                totalAmount,
            });
        }

        


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


exports.paymentReceived = async (req, res) => {
    try {
        const { entries } = req.body;

        // const entryIds = entries.map((e) => e.entryId);

        // // ✅ Wait for all updates to complete
        // await Promise.all(
        //     entryIds.map(async (id) => {
        //         await UsageEntry.findByIdAndUpdate(id, { isPaid: true });
        //     })
        // );

        const entryIds = entries.map((e) => e.entryId);

        await UsageEntry.updateMany(
            { _id: { $in: entryIds } },
            { isPaid: true }
        );

        // Check what actually got saved
        // const check = await UsageEntry.find({ _id: { $in: entryIds } });
        // console.log("DB check:", check.map(e => ({ id: e._id, isPaid: e.isPaid })));

        res.json({
            success: true,
            message: "Payment completed",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.paidBills = async(req,res) =>{
    try {
        const { hourlyRate } = req.query;

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

            const formattedEntries = entries
                .filter(entry => entry.isPaid === true)
                .map((entry) => {
                    totalMinutes += entry.totalMinutes;
                    const hours = entry.totalMinutes / 60;
                    const amount = hours * Number(hourlyRate);

                    return {
                        entryId: entry._id,
                        date: entry.date,
                        isPaid: entry.isPaid,
                        tubewell: entry.tubewell?.name || "N/A",
                        start: `${entry.startHour}:${String(entry.startMinute).padStart(2, "0")}`,
                        end: `${entry.endHour}:${String(entry.endMinute).padStart(2, "0")}`,
                        hours: hours,
                        amount: amount,
                    };
                });

            const totalHours = totalMinutes / 60;
            const totalAmount = totalHours * Number(hourlyRate);

            totalMoney += totalAmount



            result.push({
                personId: person._id,
                person: person.name,
                entries: formattedEntries,
                totalHours,
                totalAmount,
            });
        }




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
}