import { useState } from "react";
import PersonSelector from "../persons/PersonSelector";

const EntryForm = ({
  persons,
  selectedPerson,
  setSelectedPerson,
  onAddPerson,
  onDeletePerson,
  onSubmitEntry,
}) => {

  // START TIME
  const [startHour, setStartHour] = useState("1");
  const [startMinute, setStartMinute] =
    useState("00");

  // END TIME
  const [endHour, setEndHour] = useState("1");
  const [endMinute, setEndMinute] =
    useState("00");

  const [extraCycles, setExtraCycles] =
    useState(0);

  const [description, setDescription] =
    useState("");

  // DATE
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPerson) {
      alert("Please select a person");
      return;
    }

    const entryData = {
      person: selectedPerson._id,

      startHour: Number(startHour),
      startMinute: Number(startMinute),

      endHour: Number(endHour),
      endMinute: Number(endMinute),

      extraCycles: Number(extraCycles),

      description,

      date,
    };

    onSubmitEntry(entryData);

    // RESET
    setStartHour("1");
    setStartMinute("00");

    setEndHour("1");
    setEndMinute("00");

    setExtraCycles(0);
    setDescription("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="relative  rounded-[30px] bg-white shadow-2xl border border-blue-100">

        {/* TOP BAR */}
        <div className="h-3 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600"></div>

        <div className="p-8">

          {/* HEADER */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
              Create New Entry
            </h2>

            <p className="text-gray-500 mt-2 text-sm">
              Add tubewell usage details with smart tracking
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >


{/* PERSON */}
<div>
  <label className="block mb-3 text-sm font-bold  text-gray-700">
    Select Person
  </label>

  <div
    className="
      relative
      z-50
      max-h-64
      overflow-y-auto
      rounded-2xl
      border
      border-gray-200
      bg-gradient-to-br
      from-gray-50
      to-blue-50
      p-4
      shadow-xl
    "
  >
    <PersonSelector
      persons={persons}
      selectedPerson={selectedPerson}
      setSelectedPerson={setSelectedPerson}
      onAddPerson={onAddPerson}
      onDeletePerson={onDeletePerson}
    />
  </div>
</div>

            {/* DATE */}
            <div>
              <label className="block mb-3 text-sm font-bold text-gray-700">
                Select Date
              </label>

              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                  📅
                </div>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="
                    w-full
                    rounded-2xl
                    border-2
                    border-blue-100
                    bg-gradient-to-r
                    from-blue-50
                    to-cyan-50
                    px-14
                    py-4
                    text-lg
                    font-semibold
                    text-gray-700
                    shadow-sm
                    outline-none
                    transition-all
                    duration-300
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-3 text-sm font-bold text-gray-700">
                Description
              </label>

              <input
                type="text"
                placeholder="Example: Morning irrigation"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-300
                  bg-gray-50
                  px-5
                  py-4
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                "
              />
            </div>

            {/* TIME GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* START TIME */}
              <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-100 p-6 shadow-sm">

                <div className="absolute top-0 left-0 h-full w-2 bg-green-500"></div>

                <label className="block text-sm font-bold text-green-800 mb-4">
                  Start Time
                </label>

                <div className="flex items-center gap-3">

                  {/* HOUR */}
                  <select
                    value={startHour}
                    onChange={(e) =>
                      setStartHour(e.target.value)
                    }
                    className="
                      flex-1
                      rounded-2xl
                      border-2
                      border-green-200
                      bg-white
                      px-4
                      py-4
                      text-2xl
                      font-black
                      text-center
                      text-green-800
                      shadow-inner
                      outline-none
                      focus:border-green-500
                      focus:ring-4
                      focus:ring-green-200
                    "
                  >
                    {Array.from(
                      { length: 12 },
                      (_, i) => i + 1
                    ).map((hour) => (
                      <option
                        key={hour}
                        value={hour}
                      >
                        {String(hour).padStart(
                          2,
                          "0"
                        )}
                      </option>
                    ))}
                  </select>

                  <span className="text-3xl font-black text-green-700">
                    :
                  </span>

                  {/* MINUTES */}
                  <select
                    value={startMinute}
                    onChange={(e) =>
                      setStartMinute(
                        e.target.value
                      )
                    }
                    className="
                      flex-1
                      rounded-2xl
                      border-2
                      border-green-200
                      bg-white
                      px-4
                      py-4
                      text-2xl
                      font-black
                      text-center
                      text-green-800
                      shadow-inner
                      outline-none
                      focus:border-green-500
                      focus:ring-4
                      focus:ring-green-200
                    "
                  >
                    {Array.from(
                      { length: 12 },
                      (_, i) => i * 5
                    ).map((minute) => (
                      <option
                        key={minute}
                        value={minute}
                      >
                        {String(minute).padStart(
                          2,
                          "0"
                        )}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* END TIME */}
              <div className="relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-rose-100 p-6 shadow-sm">

                <div className="absolute top-0 left-0 h-full w-2 bg-red-500"></div>

                <label className="block text-sm font-bold text-red-800 mb-4">
                  End Time
                </label>

                <div className="flex items-center gap-3">

                  {/* HOUR */}
                  <select
                    value={endHour}
                    onChange={(e) =>
                      setEndHour(e.target.value)
                    }
                    className="
                      flex-1
                      rounded-2xl
                      border-2
                      border-red-200
                      bg-white
                      px-4
                      py-4
                      text-2xl
                      font-black
                      text-center
                      text-red-800
                      shadow-inner
                      outline-none
                      focus:border-red-500
                      focus:ring-4
                      focus:ring-red-200
                    "
                  >
                    {Array.from(
                      { length: 12 },
                      (_, i) => i + 1
                    ).map((hour) => (
                      <option
                        key={hour}
                        value={hour}
                      >
                        {String(hour).padStart(
                          2,
                          "0"
                        )}
                      </option>
                    ))}
                  </select>

                  <span className="text-3xl font-black text-red-700">
                    :
                  </span>

                  {/* MINUTES */}
                  <select
                    value={endMinute}
                    onChange={(e) =>
                      setEndMinute(
                        e.target.value
                      )
                    }
                    className="
                      flex-1
                      rounded-2xl
                      border-2
                      border-red-200
                      bg-white
                      px-4
                      py-4
                      text-2xl
                      font-black
                      text-center
                      text-red-800
                      shadow-inner
                      outline-none
                      focus:border-red-500
                      focus:ring-4
                      focus:ring-red-200
                    "
                  >
                    {Array.from(
                      { length: 12 },
                      (_, i) => i * 5
                    ).map((minute) => (
                      <option
                        key={minute}
                        value={minute}
                      >
                        {String(minute).padStart(
                          2,
                          "0"
                        )}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* EXTRA CYCLES */}
            <div>
              <label className="block mb-3 text-sm font-bold text-gray-700">
                Extra Cycles
              </label>

              <input
                type="number"
                min="0"
                value={extraCycles}
                onChange={(e) =>
                  setExtraCycles(e.target.value)
                }
                placeholder="0"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-300
                  bg-gray-50
                  px-5
                  py-4
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                "
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                via-cyan-500
                to-indigo-600
                py-4
                text-lg
                font-bold
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                active:scale-[0.98]
              "
            >
              Save Entry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;