import { useState } from "react";

import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery } from "@tanstack/react-query";

import MainModal from "./MainModal";
import { queryClient } from "../main";
import type { TableRow } from "../types";
import { useSession } from "../hooks/useSession";
import { deleteStudent, getStudents } from "../lib/http";

const StudentsTable = () => {
  const { token } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<TableRow | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["get-students"],
    queryFn: () => getStudents(token!),
    enabled: token !== null,
  });

  const { mutate: DeleteMutation, isPending } = useMutation({
    mutationKey: ["delete-student"],
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-students"] });
    },
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
            disabled={isPending}
            onClick={() => {
              DeleteMutation({ id: row.id, token: token! });
            }}
          >
            <DeleteIcon />
          </Button>

          <Button
            disabled={isPending}
            onClick={editClickHandler.bind(this, row)}
          >
            <EditIcon />
          </Button>
        </>
      ),
    },
  ];

  const toggleModalHandler = () => {
    setIsOpen((prev) => !prev);
  };

  let rows: TableRow[] = [];

  if (data) {
    rows = data.map((row) => ({
      ...row,
      gradeId: row.grade.id,
      genderId: row.gender.id,
      grade: row.grade.translations[0].name,
      gender: row.gender.translations[0].name,
    }));
  }

  return (
    <Box height={500} width="90%" mx="auto">
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading}
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
  );
};

export default StudentsTable;
