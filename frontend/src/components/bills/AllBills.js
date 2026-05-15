import { useEffect, useState } from "react";
import api from "../../api/axios"

export default function AllBills() {
    const [bills, setBills] = useState([]);
    const [totalCollection, settotalCollection] = useState(0);
    const [rate, setRate] = useState(100);
    const [loading, setLoading] = useState(false);

    const fetchBills = async () => {
        try {
            setLoading(true);

            const res = await api.get(
                `/api/bills/all?hourlyRate=${rate}`
            );

            settotalCollection(res.data.totalMoney)

            setBills(res.data.bills || []);
        } catch (err) {
            console.log(err);
            alert("Error loading bills");
        } finally {
            setLoading(false);
        }
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchBills();
    }, []);




    const formatHours = (decimalHours) => {
        const totalMinutes = Math.round(decimalHours * 60);
        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;
        return `${h} hr ${m} min`;
    };

    const hadlePaymentComplete = async (entries) => {
        try {
            const validEntries = entries.filter(e => e !== null && e !== undefined);
            
            const res = await api.post(`/api/bills/payment`, {
                entries: validEntries
            });

            fetchBills();
            alert("Payment marked as complete!");
        } catch (err) {
            console.log(err);
            alert("Error marking payment");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 p-6">

            {/* HEADER */}
            <div className="max-w-5xl mx-auto mb-8  flex justify-evenly">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        💰 Billing Dashboard
                    </h1>
                    <p className="text-gray-500">
                        Track tubewell usage and generate smart bills
                    </p>
                </div >

                <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-3xl font-extrabold text-green-700">
                        ₹{Math.round(totalCollection)}
                    </p>
                </div>
            </div>

            {/* RATE BAR */}
            <div className="max-w-5xl mx-auto flex items-center gap-3 mb-8 bg-white p-4 rounded-2xl shadow-md border">
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">₹/Hour:</span>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="border rounded-xl px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    onClick={fetchBills}
                    className="ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition"
                >
                    Refresh Bills
                </button>
            </div>

            {/* LOADING */}
            {loading && (
                <p className="text-center text-gray-500">Loading bills...</p>
            )}

            {/* BILLS */}
            <div className="space-y-10 max-w-5xl mx-auto">

                {bills.filter(bill => bill.entries.length > 0).map((bill, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden border hover:shadow-2xl transition"
                    >

                        {/* TOP BAR */}
                        <div className="h-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400"></div>

                        <div className="p-6">

                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {bill.person}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Tubewell Usage Invoice
                                    </p>
                                </div>

                                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                                    Bill #{index + 1}
                                </span>
                            </div>

                            {/* TABLE HEADER */}
                            <div className="grid grid-cols-5 text-xs font-semibold text-gray-500 border-b pb-2">
                                <span>Date</span>
                                <span>Tubewell</span>
                                <span>Time</span>
                                <span>Duration</span>
                                <span className="text-right">Amount</span>
                            </div>

                            {/* ENTRIES */}
                            <div className="divide-y">
                                {bill.entries.filter(e => e !== null).map((e, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-5 py-3 text-sm text-gray-700"
                                    >
                                        <span>
                                            {new Date(e.date).toLocaleDateString("en-IN")}
                                        </span>

                                        <span className="font-medium">
                                            {e.tubewell}
                                        </span>

                                        <span>
                                            {e.start} - {e.end}
                                        </span>

                                        <span className="text-gray-600">
                                            {formatHours(Number(e.hours))}
                                        </span>

                                        <span className="text-right font-semibold text-green-600">
                                            ₹{Math.round(e.amount)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* TOTAL */}
                            {/* <div className="mt-6 flex justify-around  bg-gray-50 p-4 rounded-2xl">

                                <div>
                                    <p className="text-sm text-gray-500">Total Time</p>
                                    <p className="text-lg font-bold">
                                        {formatHours(Number(bill.totalHours))}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="text-3xl font-extrabold text-indigo-600">
                                        ₹{Math.round(bill.totalAmount)}
                                    </p>
                                </div>

                                <button
                                    onClick={hadlePaymentComplete}
                                    className="w-full text-left px-4 py-3 border-t text-green-600 hover:bg-green-50 font-medium"
                                >

                                    payment received
                                    
                                </button>

                            </div> */}

                            <div className="mt-6 bg-gray-50 rounded-2xl p-5 border border-gray-100">

                                <div className="flex items-center justify-between gap-6 flex-wrap">

                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">
                                            Total Time
                                        </p>

                                        <p className="text-xl font-bold text-gray-800">
                                            {formatHours(Number(bill.totalHours))}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 mb-1">
                                            Total Amount
                                        </p>

                                        <p className="text-3xl font-extrabold text-indigo-600">
                                            ₹{Math.round(bill.totalAmount)}
                                        </p>
                                    </div>

                                </div>

                                <button
                                    onClick={() => hadlePaymentComplete(bill.entries)}
                                    className="mt-5 w-full bg-green-600 hover:bg-green-700 transition-all duration-200 text-white font-semibold py-3 rounded-xl shadow-sm"
                                >
                                    Payment Received
                                </button>

                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}