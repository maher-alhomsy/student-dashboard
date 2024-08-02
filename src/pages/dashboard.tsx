import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";

import { getStudents } from "../lib/http";
import { TransformedStudent } from "../types";
import { useSession } from "../hooks/useSession";

const DashboardPage = () => {
  const { token } = useSession();
  const [row, setRow] = useState<TransformedStudent[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["get-students"],
    queryFn: () => getStudents(token!),
    enabled: token !== null,
  });

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
      renderCell: () => (
        <div>
          <Button color="primary" variant="contained">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!data) return;

    const rows: TransformedStudent[] = [];

    data.forEach((item) => {
      const row = {
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        dateOfBirth: item.birthDate,
        educationalLevel: item.grade.translations[0].name,
        gender: item.gender.translations[1].name,
        country: item.country,
        city: item.city,
        mobileNumber: item.phone,
        notes: item.remarks,
      };

      rows.push(row);
    });

    setRow(rows);
  }, [data]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid loading={isLoading} rows={row} columns={columns} />
    </div>
  );
};

export default DashboardPage;
