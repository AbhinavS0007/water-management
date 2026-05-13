import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  tubewells = [],
  selectedTubewell,
  setSelectedTubewell,
  onAddTubewell,
  onDeleteTubewell,
}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const handleSelect = (tubewell) => {
    setSelectedTubewell(tubewell);
    setShowDropdown(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tubewell?"
    );
    if (confirmDelete) {
      onDeleteTubewell(id);
    }
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between">
      {/* LEFT */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg min-w-[180px]"
        >
          {selectedTubewell?.name || "👉 Select Tubewell"}
        </button>

        {showDropdown && (
          <div className="absolute mt-2 w-72 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
            {tubewells.length > 0 ? (
              tubewells.map((t) => (
                <div
                  key={t._id}
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                >
                  <button
                    onClick={() => handleSelect(t)}
                    className="flex-1 text-left"
                  >
                    {t.name}
                  </button>

                  <button
                    onClick={() => handleDelete(t._id)}
                    className="text-red-500 hover:text-red-700 font-bold ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm">
                No tubewells found. Click below to add one.
              </div>
            )}

            <button
              onClick={onAddTubewell}
              className="w-full text-left px-4 py-3 border-t text-green-600 hover:bg-green-50 font-medium"
            >
              ➕ Add New Tubewell
            </button>
          </div>
        )}
      </div>


      {/* RIGHT */}
      <button
        onClick={() =>
          navigate("/", {
            state: { tubewell: selectedTubewell },
          })
        }
        disabled={!selectedTubewell}
        className={`px-4 py-2 rounded-lg text-white ${
          selectedTubewell
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Home
      </button>

      {/* RIGHT */}
      <button
        onClick={() =>
          navigate("/bills", {
            state: { tubewell: selectedTubewell },
          })
        }
        disabled={!selectedTubewell}
        className={`px-4 py-2 rounded-lg text-white ${
          selectedTubewell
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        View Bills
      </button>
    </nav>
  );
};

export default Navbar;