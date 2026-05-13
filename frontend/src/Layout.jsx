import Navbar from "./components/layouts/Navbar";

const Layout = ({
  children,
  tubewells,
  selectedTubewell,
  setSelectedTubewell,
  onAddTubewell,
  onDeleteTubewell,
}) => {
  return (
    <div>
      <Navbar
        tubewells={tubewells}
        selectedTubewell={selectedTubewell}
        setSelectedTubewell={setSelectedTubewell}
        onAddTubewell={onAddTubewell}
        onDeleteTubewell={onDeleteTubewell}
      />

      {children}
    </div>
  );
};

export default Layout;