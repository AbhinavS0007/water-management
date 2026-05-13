import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "./Layout";
import Home from "./components/pages/Home";
import AllBills from "./components/bills/AllBills";

function App() {
  const [tubewells, setTubewells] = useState([]);
  const [selectedTubewell, setSelectedTubewell] = useState(null);

  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [entries, setEntries] = useState([]);

  // ------------------ TUBEWELLS ------------------
  const fetchTubewells = async () => {
    const res = await axios.get("http://localhost:5002/api/tubewells");
    setTubewells(res.data);

    if (!selectedTubewell && res.data.length > 0) {
      setSelectedTubewell(res.data[0]);
    }
  };
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchTubewells();
  }, []);

  // ------------------ PERSONS ------------------
  const fetchPersons = async () => {
    if (!selectedTubewell?._id) return;

    const res = await axios.get(
      `http://localhost:5002/api/persons?tubewell=${selectedTubewell._id}`
    );

    setPersons(res.data);
    setSelectedPerson(res.data[0] || null);
  };
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchPersons();
  }, [selectedTubewell]);

  // ------------------ ENTRIES ------------------
  const fetchEntries = async () => {
    if (!selectedTubewell?._id) return;

    const res = await axios.get(
      `http://localhost:5002/api/entries?tubewellId=${selectedTubewell._id}`
    );

    setEntries(res.data);
  };
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchEntries();
  }, [selectedTubewell]);

  // ------------------ CRUD ------------------
  const handleAddTubewell = async () => {
    const name = prompt("Enter tubewell name");
    if (!name) return;

    await axios.post("http://localhost:5002/api/tubewells", { name });
    fetchTubewells();
  };

  const handleDeleteTubewell = async (id) => {
    if (!window.confirm("Delete tubewell?")) return;

    await axios.delete(
      `http://localhost:5002/api/tubewells/${id}`
    );

    setTubewells((prev) => prev.filter((t) => t._id !== id));

    if (selectedTubewell?._id === id) {
      setSelectedTubewell(null);
    }
  };

  const handleAddPerson = async () => {
    const name = prompt("Enter person name");
    if (!name || !selectedTubewell) return;

    await axios.post("http://localhost:5002/api/persons", {
      name,
      tubewell: selectedTubewell._id,
    });

    fetchPersons();
  };

  const handleDeletePerson = async (id) => {
    if (!window.confirm("Delete person?")) return;

    await axios.delete(
      `http://localhost:5002/api/persons/${id}`
    );

    fetchPersons();
  };

  const handleSubmitEntry = async (entryData) => {
    const payload = {
      ...entryData,
      tubewell: selectedTubewell._id,
    };

    await axios.post(
      `http://localhost:5002/api/entries?tubewellId=${selectedTubewell._id}`,
      payload
    );

    fetchEntries();
  };

  return (
    <BrowserRouter>
      <Layout
        tubewells={tubewells}
        selectedTubewell={selectedTubewell}
        setSelectedTubewell={setSelectedTubewell}
        onAddTubewell={handleAddTubewell}
        onDeleteTubewell={handleDeleteTubewell}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                persons={persons}
                selectedPerson={selectedPerson}
                setSelectedPerson={setSelectedPerson}
                onAddPerson={handleAddPerson}
                onDeletePerson={handleDeletePerson}
                entries={entries}
                onSubmitEntry={handleSubmitEntry}
              />
            }
          />

          <Route path="/bills" element={<AllBills />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;