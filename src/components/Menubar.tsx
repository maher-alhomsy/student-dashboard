import { useState } from "react";

import { Box, Container, Typography } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import SignoutModal from "./SignoutModal";

const Menubar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Container
        sx={{
          width: 250,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Box flex={1}>
          <Box
            display="flex"
            alignItems="center"
            borderLeft="4px solid #1F7BF4"
            gap={1}
            pl={2}
          >
            <AutoStoriesIcon color="action" sx={{ display: "flex" }} />

            <Typography
              noWrap
              variant="h6"
              sx={{
                color: "black",
                fontWeight: 700,
                textDecoration: "none",
                display: { xs: "none", md: "flex" },
              }}
            >
              Student's Data
            </Typography>
          </Box>
        </Box>

        <Box
          pl={3}
          mb={2}
          gap={1}
          display="flex"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={() => setIsOpen(true)}
        >
          <PowerSettingsNewIcon color="action" sx={{ display: "flex" }} />

          <Typography
            noWrap
            sx={{
              color: "black",
              fontWeight: 700,
              textDecoration: "none",
              display: { xs: "none", md: "flex" },
            }}
          >
            Logout
          </Typography>
        </Box>
      </Container>

      <SignoutModal onClose={closeModalHandler} isOpen={isOpen} />
    </>
  );
};

export default Menubar;
