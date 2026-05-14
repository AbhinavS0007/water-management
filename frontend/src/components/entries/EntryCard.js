import { useState } from "react";
import api from "../../api/axios"
import EditEntryModal from "./EditEntryModal";

const EntryCard = ({ entry, onDelete, onUpdate }) => {
  const [showUpdate, setShowUpdate] = useState(false);

  const formatTime = (hour, minute) => {
    if (hour == null || minute == null) return "-- : --";
    return `${String(hour).padStart(2, "0")} : ${String(minute).padStart(2, "0")}`;
  };

  const totalMinutes = entry?.totalMinutes || 0;
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const isValid =
    entry?.startHour != null &&
    entry?.endHour != null &&
    totalMinutes > 0;

  // 🗑 DELETE ENTRY
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
  
    if (!confirmDelete) return;
  
    try {
      await api.delete(
        `/api/entries/${entry._id}`
      );
  
      if (onDelete) onDelete(entry._id);
  
      // 🔄 refresh page after delete
      window.location.reload();
    } catch (err) {
      console.log("Delete error:", err.response?.data || err.message);
    }
  };

  // ✏️ UPDATE ENTRY
  const handleUpdate = async (data) => {
    try {
      const res = await api.put(
        `/api/entries/${entry._id}`,
        data
      );

      if (onUpdate) onUpdate(res.data);
      setShowUpdate(false);
      window.location.reload();
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {entry?.person?.name || "No Person"}
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => setShowUpdate(true)}
              className="text-xs px-3 py-1 rounded-full font-semibold bg-orange-100 text-orange-600"
            >
              update
            </button>

            <button
              onClick={handleDelete}
              className="text-xs px-3 py-1 rounded-full font-semibold bg-red-100 text-red-600"
            >
              delete
            </button>

            <button
              onClick={handleDelete}
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                entry?.isPaid
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {entry?.isPaid === true ? `paid`: `notPaid`}
            </button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-1">
          {entry?.description || "No description"}
        </p>

        {/* DATE */}
        <p className="text-sm text-gray-600 mt-3">
          📅{" "}
          {entry?.date
            ? new Date(entry.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "No date"}
        </p>

        {/* TIME */}
        <div className="grid grid-cols-2 gap-3 mt-4">

          <div className="bg-green-50 border rounded-lg p-3">
            <p className="text-xs text-green-700">Start</p>
            <p className="text-lg font-semibold text-green-800">
              {formatTime(entry?.startHour, entry?.startMinute)}
            </p>
          </div>

          <div className="bg-red-50 border rounded-lg p-3">
            <p className="text-xs text-red-700">End</p>
            <p className="text-lg font-semibold text-red-800">
              {formatTime(entry?.endHour, entry?.endMinute)}
            </p>
          </div>
        </div>

        {/* DURATION */}
        <div className="mt-4 bg-blue-50 border rounded-lg p-3 flex justify-between items-center">
          <p className="text-sm text-blue-700 font-medium">
            Duration
          </p>

          <p className="text-lg font-bold text-blue-800">
            {isValid ? `${totalHours}h ${remainingMinutes}m` : "--"}
          </p>
        </div>
      </div>

      {/* ================= UPDATE MODAL ================= */}
      {showUpdate && (
        <EditEntryModal
          entry={entry}
          onClose={() => setShowUpdate(false)}
          onUpdate={handleUpdate}
        />
      )}
          
      
    </>
  );
};

export default EntryCard;