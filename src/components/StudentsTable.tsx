import { useState } from "react";

import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

import MainModal from "./MainModal";
import { queryClient } from "../main";
import { TransformedStudent } from "../types";
import { useSession } from "../hooks/useSession";
import { deleteStudent, getStudents } from "../lib/http";

const StudentsTable = () => {
  const { token } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<TransformedStudent | null>(
    null
  );

  const { data, isLoading } = useQuery({
    queryKey: ["get-students"],
    queryFn: () => getStudents(token!),
    enabled: token !== null,
  });

  const { mutate } = useMutation({
    mutationKey: ["delete-student"],
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-students"] });
    },
  });

  const editClickHandler = (student: TransformedStudent) => {
    setEditStudent(student);
    toggleModalHandler();
  };

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
    { field: "educationalLevel", headerName: "Educational Level", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "mobileNumber", headerName: "Mobile Number", width: 150 },
    { field: "notes", headerName: "Notes", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<TransformedStudent>) => (
        <>
          <Button
            color="error"
            onClick={() => {
              mutate({ id: row.id, token: token! });
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

  return (
    <>
      <DataGrid
        columns={columns}
        loading={isLoading}
        rows={
          data?.map((item) => ({
            ...item,
            notes: item.remarks,
            mobileNumber: item.phone,
            dateOfBirth: item.birthDate,
            gender: item.gender.translations[1].name,
            educationalLevel: item.grade.translations[0].name,
          })) || []
        }
      />

      <MainModal
        type="EDIT"
        isOpen={isOpen}
        student={editStudent!}
        onClose={toggleModalHandler}
      />
    </>
  );
};

export default StudentsTable;
