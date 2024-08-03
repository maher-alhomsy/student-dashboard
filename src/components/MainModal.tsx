import {
  Box,
  Modal,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { queryClient } from "../main";
import { Grade, TransformedStudent } from "../types";
import { studentScheme, Student } from "../lib/validator";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: "EDIT" | "CREATE";
  student?: TransformedStudent;
};

const INITIAL_VALUE = {
  city: "",
  grade: "",
  phone: "",
  gender: "",
  country: "",
  remarks: "",
  lastName: "",
  firstName: "",
  birthDate: "",
};

const MainModal = ({ isOpen, onClose, type, student }: Props) => {
  const grades = queryClient.getQueryData<Grade[]>(["all-grades"]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Student>({
    resolver: zodResolver(studentScheme),
    values:
      type === "EDIT" && student
        ? {
            ...student,
            remarks: student.notes,
            phone: student.mobileNumber,
            grade: student.educationalLevel,
            birthDate: student.dateOfBirth.slice(0, 10),
          }
        : INITIAL_VALUE,
  });

  const submitHandler = (values: Student) => {
    console.log(values);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        component="form"
        sx={{
          p: 4,
          width: 670,
          top: "50%",
          left: "50%",
          boxShadow: 24,
          borderRadius: 5,
          position: "absolute",
          bgcolor: "background.paper",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          {type === "CREATE" ? "Add Student" : "Modify Student Data"}
        </Typography>

        <Box display="flex" gap={2}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="firstName"
                margin="normal"
                label="First Name"
                error={Boolean(errors.firstName)}
                sx={{ backgroundColor: "#F5F5F5" }}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="lastName"
                margin="normal"
                label="Last Name"
                error={Boolean(errors.lastName)}
                sx={{ backgroundColor: "#F5F5F5" }}
              />
            )}
          />
        </Box>

        <Box display="flex" gap={2}>
          <Controller
            control={control}
            name="birthDate"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="date"
                margin="normal"
                id="dateOfBirth"
                label="Date of Birth"
                error={Boolean(errors.birthDate)}
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: "#F5F5F5" }}
              />
            )}
          />

          <Controller
            name="grade"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="educational-label">
                  Educational Level
                </InputLabel>

                <Select
                  {...field}
                  labelId="educational-label"
                  error={Boolean(errors.grade)}
                  sx={{ backgroundColor: "#F5F5F5" }}
                >
                  {grades &&
                    grades.map(({ id, translations }) => (
                      <MenuItem key={id} value={id}>
                        {translations[0].name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          />
        </Box>

        <Box display="flex" gap={2}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  id="country"
                  {...field}
                  labelId="country-label"
                  error={Boolean(errors.country)}
                  sx={{ backgroundColor: "#F5F5F5" }}
                >
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Syria">Syria</MenuItem>
                  <MenuItem value="Egypt">Egypt</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="city"
                label="City"
                margin="normal"
                error={Boolean(errors.city)}
                sx={{ backgroundColor: "#F5F5F5" }}
              />
            )}
          />
        </Box>

        <Box display="flex" gap={2}>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="phone"
                label="Mobile"
                margin="normal"
                error={Boolean(errors.phone)}
                sx={{ backgroundColor: "#F5F5F5" }}
              />
            )}
          />

          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  {...field}
                  id="gender"
                  labelId="gender-label"
                  sx={{ background: "#F5F5F5" }}
                  error={Boolean(errors.gender)}
                >
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Box>

        <Controller
          control={control}
          name="remarks"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              id="note"
              label="Note"
              margin="normal"
              sx={{ backgroundColor: "#F5F5F5" }}
              inputProps={{ style: { height: 100, textAlign: "start" } }}
            />
          )}
        />

        <Box mt={2} gap={2} display="flex" justifyContent="space-between">
          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit(submitHandler)}
            sx={{ borderRadius: 3, textTransform: "none" }}
          >
            {type === "CREATE" ? "Add" : "Modify"}
          </Button>

          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={onClose}
            sx={{ borderRadius: 3, textTransform: "none" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MainModal;
