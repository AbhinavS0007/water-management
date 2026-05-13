import { useState } from "react";

const EditEntryModal = ({ entry, onClose, onUpdate }) => {
  const [date, setDate] = useState(entry.date?.split("T")[0] || "");

  const [startHour, setStartHour] = useState(entry.startHour);
  const [startMinute, setStartMinute] = useState(entry.startMinute);

  const [endHour, setEndHour] = useState(entry.endHour);
  const [endMinute, setEndMinute] = useState(entry.endMinute);

  const [description, setDescription] = useState(entry.description);
  const [extraCycles, setExtraCycles] = useState(entry.extraCycles);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      date,
      startHour: Number(startHour),
      startMinute: Number(startMinute),
      endHour: Number(endHour),
      endMinute: Number(endMinute),
      description,
      extraCycles: Number(extraCycles),
    };

    onUpdate(updatedData);   // 👈 ONLY SEND DATA
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Update Entry</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Description"
          />

          <input
            type="number"
            value={extraCycles}
            onChange={(e) => setExtraCycles(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Extra cycles"
          />

          <div className="flex gap-2">
            <input
              type="number"
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
              className="w-1/2 border p-2 rounded"
              placeholder="Start Hour"
            />
            <input
              type="number"
              value={startMinute}
              onChange={(e) => setStartMinute(e.target.value)}
              className="w-1/2 border p-2 rounded"
              placeholder="Start Min"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
              className="w-1/2 border p-2 rounded"
              placeholder="End Hour"
            />
            <input
              type="number"
              value={endMinute}
              onChange={(e) => setEndMinute(e.target.value)}
              className="w-1/2 border p-2 rounded"
              placeholder="End Min"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Update Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEntryModal;