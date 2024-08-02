import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";
import StudentsTable from "../components/StudentsTable";

const DashboardPage = () => {
  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <Navbar />
      <div style={{ display: "flex", height: "100%" }}>
        <Menubar />
        <StudentsTable />
      </div>
    </div>
  );
};

export default DashboardPage;
