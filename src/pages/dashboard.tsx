import { Box } from "@mui/material";

import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";
import StudentsTable from "../components/StudentsTable";
import FilterSection from "../components/FilterSection";

const DashboardPage = () => {
  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <Navbar />
      <div style={{ display: "flex", height: "100%" }}>
        <Menubar />

        <Box flexDirection="column" flexGrow={1} width={400}>
          <FilterSection />
          <StudentsTable />
        </Box>
      </div>
    </div>
  );
};

export default DashboardPage;
