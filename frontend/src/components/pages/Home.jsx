import EntryForm from "../entries/EntryForm";
import EntryList from "../entries/EntryList";

const Home = ({
  persons,
  selectedPerson,
  setSelectedPerson,
  onAddPerson,
  onDeletePerson,
  entries,
  onSubmitEntry,
}) => {
  return (
    <div>
      <EntryForm
        persons={persons}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        onAddPerson={onAddPerson}
        onDeletePerson={onDeletePerson}
        onSubmitEntry={onSubmitEntry}
      />

      <EntryList entries={entries} />
    </div>
  );
};

export default Home;