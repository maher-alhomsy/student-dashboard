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

import { TransformedStudent } from "../types";
import { studentScheme, Student } from "../lib/validator";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: "EDIT" | "CREATE";
  student?: TransformedStudent;
};

const MainModal = ({ isOpen, onClose, type, student }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Student>({
    resolver: zodResolver(studentScheme),
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
            render={({ field: { name, value, onChange } }) => (
              <TextField
                fullWidth
                name={name}
                value={value}
                id="firstName"
                margin="normal"
                label="First Name"
                onChange={onChange}
                error={Boolean(errors.firstName)}
                sx={{ backgroundColor: "#F5F5F5" }}
                defaultValue={type === "EDIT" ? student?.firstName : value}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field: { name, value, onChange } }) => (
              <TextField
                fullWidth
                name={name}
                value={value}
                id="lastName"
                margin="normal"
                label="Last Name"
                onChange={onChange}
                error={Boolean(errors.lastName)}
                sx={{ backgroundColor: "#F5F5F5" }}
                defaultValue={type === "EDIT" ? student?.lastName : value}
              />
            )}
          />
        </Box>

        <Box display="flex" gap={2}>
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { name, value, onChange } }) => (
              <TextField
                fullWidth
                name={name}
                type="date"
                value={value}
                margin="normal"
                id="dateOfBirth"
                onChange={onChange}
                label="Date of Birth"
                error={Boolean(errors.birthDate)}
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: "#F5F5F5" }}
                defaultValue={
                  type === "EDIT" ? student?.dateOfBirth.slice(0, 10) : value
                }
              />
            )}
          />

          <Controller
            name="grade"
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="educational-label">
                  Educational Level
                </InputLabel>

                <Select
                  name={name}
                  value={value}
                  onChange={onChange}
                  labelId="educational-label"
                  error={Boolean(errors.grade)}
                  sx={{ backgroundColor: "#F5F5F5" }}
                  defaultValue={
                    type === "EDIT" ? student?.educationalLevel : value
                  }
                >
                  <MenuItem value="Grade 1">Grade 1</MenuItem>
                  <MenuItem value="Grade 9">Grade 9</MenuItem>
                  <MenuItem value="University">University</MenuItem>
                  <MenuItem value="High School">High School</MenuItem>
                  <MenuItem value="Middle School">Middle School</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Box>

        <Box display="flex" gap={2}>
          <Controller
            name="country"
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  id="country"
                  name={name}
                  value={value}
                  onChange={onChange}
                  labelId="country-label"
                  error={Boolean(errors.country)}
                  sx={{ backgroundColor: "#F5F5F5" }}
                  defaultValue={type === "EDIT" ? student?.country : value}
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
            render={({ field: { name, value, onChange } }) => (
              <TextField
                fullWidth
                id="city"
                name={name}
                value={value}
                label="City"
                margin="normal"
                onChange={onChange}
                error={Boolean(errors.city)}
                sx={{ backgroundColor: "#F5F5F5" }}
                defaultValue={type === "EDIT" ? student?.city : value}
              />
            )}
          />
        </Box>

        <Box display="flex" gap={2}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { name, value, onChange } }) => (
              <TextField
                fullWidth
                id="phone"
                name={name}
                value={value}
                label="Mobile"
                margin="normal"
                onChange={onChange}
                error={Boolean(errors.phone)}
                sx={{ backgroundColor: "#F5F5F5" }}
                defaultValue={type === "EDIT" ? student?.mobileNumber : value}
              />
            )}
          />

          <Controller
            control={control}
            name="gender"
            render={({ field: { name, value, onChange } }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  id="gender"
                  name={name}
                  value={value}
                  onChange={onChange}
                  labelId="gender-label"
                  sx={{ background: "#F5F5F5" }}
                  error={Boolean(errors.gender)}
                  defaultValue={type === "EDIT" ? student?.gender : value}
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
          render={({ field: { name, value, onChange } }) => (
            <TextField
              fullWidth
              multiline
              id="note"
              name={name}
              value={value}
              label="Note"
              margin="normal"
              onChange={onChange}
              sx={{ backgroundColor: "#F5F5F5" }}
              defaultValue={type === "EDIT" ? student?.notes : value}
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
