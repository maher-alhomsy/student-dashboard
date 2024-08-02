import { Box, Container, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import { useSession } from "../hooks/useSession";

const Menubar = () => {
  const navigate = useNavigate();
  const { onLogout } = useSession();

  const logoutHandler = () => {
    onLogout();
    navigate("/");
  };

  return (
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
        onClick={logoutHandler}
        sx={{ cursor: "pointer" }}
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
  );
};

export default Menubar;
