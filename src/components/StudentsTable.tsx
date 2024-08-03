import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";

import MainModal from "./MainModal";
import DeleteModal from "./DeleteModal";
import type { TableRow } from "../types";
import { getStudents } from "../lib/http";
import { useLanguage, useSession } from "../hooks/useSession";

const StudentsTable = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<TableRow | null>(null);
  const [filteredRows, setFilteredRows] = useState<TableRow[] | null>(null);

  const { token } = useSession();
  const { language } = useLanguage();

  const params = new URLSearchParams(search);

  const { data, isLoading } = useQuery({
    queryKey: ["get-students"],
    queryFn: () => getStudents(token!),
    enabled: token !== null,
  });

  const editClickHandler = (student: TableRow) => {
    setEditStudent(student);
    toggleModalHandler();
  };

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "birthDate", headerName: "Date of Birth", width: 150 },
    { field: "grade", headerName: "Educational Level", width: 200 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "phone", headerName: "Mobile Number", width: 200 },
    { field: "remarks", headerName: "Notes", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: ({ row }: { row: TableRow }) => (
        <>
          <Button
            color="error"
            onClick={() => {
              setIsDeleteModalOpen(true);

              params.set("student-id", row.id);
              navigate({ search: params.toString() });
            }}
          >
            <DeleteIcon />
          </Button>

          <Button onClick={editClickHandler.bind(this, row)}>
            <EditIcon />
          </Button>
        </>
      ),
    },
  ];

  const toggleModalHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDeleteModal = () => {
    params.delete("student-id");
    navigate({ search: params.toString() });

    setIsDeleteModalOpen(false);
  };

  let rows: TableRow[] = [];

  if (data && !isLoading) {
    rows = data.map((row) => ({
      ...row,
      gradeId: row.grade.id,
      genderId: row.gender.id,
      grade: row.grade.translations.find((i) => i.cultureCode === language)!
        .name,
      gender: row.gender.translations.find((i) => i.cultureCode === language)!
        .name,
    }));
  }

  useEffect(() => {
    const q = params.get("q");

    if (q) {
      const filteredRows = rows.filter(
        (row) =>
          row.lastName.toLowerCase().includes(q.toLowerCase()) ||
          row.firstName.toLowerCase().includes(q.toLowerCase())
      );
      setFilteredRows(filteredRows);
    } else {
      params.delete("q");
      navigate({ search: params.toString() });
      setFilteredRows(null);
    }
  }, [search]);

  return (
    <>
      <Box height={500} width="90%" mx="auto">
        <DataGrid
          columns={columns}
          loading={isLoading}
          rows={filteredRows || rows || []}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          sx={{
            "& .MuiDataGrid-columnHeader": {
              color: "#1F7BF4",
              fontSize: "20px",
              fontWeight: "bold",
            },

            "& .MuiDataGrid-columnHeader svg": {
              color: "#1F7BF4",
            },
          }}
        />

        <MainModal
          type="EDIT"
          isOpen={isOpen}
          student={editStudent!}
          onClose={toggleModalHandler}
        />
      </Box>

      <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
    </>
  );
};

export default StudentsTable;
