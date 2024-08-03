import { useState } from "react";

import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import MainModal from "./MainModal";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";

const FilterSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModalHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box boxSizing="border-box" px={11}>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Students' Data
        </Typography>

        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={toggleModalHandler}
        >
          Add Student
        </Button>
      </Box>

      <Box display="flex" gap={1} alignItems="center" mb={3}>
        <TuneIcon width={20} color="primary" />
        <Typography component="h5" variant="h6" color="#1F7BF4">
          Filter By:
        </Typography>

        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ backgroundColor: "#F5F5F5", width: 300 }}
          placeholder="Search by first name, last name"
        />
      </Box>

      <MainModal type="CREATE" isOpen={isOpen} onClose={toggleModalHandler} />
    </Box>
  );
};

export default FilterSection;
