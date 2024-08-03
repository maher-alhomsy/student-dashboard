import { useEffect } from "react";

import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";
import { useSession } from "../hooks/useSession";
import StudentsTable from "../components/StudentsTable";
import FilterSection from "../components/FilterSection";
import { getAllGenders, getAllGrades } from "../lib/http";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  const { token } = useSession();

  useQuery({
    queryKey: ["all-grades"],
    queryFn: () => getAllGrades(token!),
    enabled: token !== null,
  });

  useQuery({
    queryKey: ["all-genders"],
    queryFn: () => getAllGenders(token!),
    enabled: token !== null,
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
  }, [token, navigate]);

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
