import { useEffect, useRef, useState } from "react";

const PersonSelector = ({
  persons = [],
  selectedPerson,
  setSelectedPerson,
  onAddPerson,
  onDeletePerson,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef();

  const handleSelect = (person) => {
    setSelectedPerson(person);
    setShowDropdown(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this person?"
    );
    if (confirmDelete) {
      onDeletePerson(id);
    }
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
  // close dropdown on outside click
  (() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* SELECT BUTTON */}
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left hover:border-blue-400 transition"
      >
        {selectedPerson?.name || "👉 Choose Person"}
      </button>

      {/* DROPDOWN */}
      {showDropdown && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-50 overflow-hidden">
          {/* PERSON LIST */}
          {persons.length > 0 ? (
            persons.map((person) => (
              <div
                key={person._id}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(person)}
                  className="flex-1 text-left"
                >
                  {person.name}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(person._id)}
                  className="text-red-500 hover:text-red-700 font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm">
              No persons found. Please add a person first.
            </div>
          )}

          {/* ADD PERSON */}
          <button
            type="button"
            onClick={onAddPerson}
            className="w-full text-left px-4 py-3 border-t text-green-600 hover:bg-green-50 font-medium"
          >
            ➕ Add New Person
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonSelector;