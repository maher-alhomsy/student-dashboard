import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";

import MainModal from "./MainModal";

const FilterSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModalHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
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

      <MainModal type="CREATE" isOpen={isOpen} onClose={toggleModalHandler} />
    </>
  );
};

export default FilterSection;
