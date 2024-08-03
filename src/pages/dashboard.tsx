import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import Navbar from "../components/Navbar";
import { getAllGrades } from "../lib/http";
import Menubar from "../components/Menubar";
import { useSession } from "../hooks/useSession";
import StudentsTable from "../components/StudentsTable";
import FilterSection from "../components/FilterSection";

const DashboardPage = () => {
  const { token } = useSession();

  useQuery({
    queryKey: ["all-grades"],
    queryFn: () => getAllGrades(token!),
    enabled: token !== null,
  });

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
