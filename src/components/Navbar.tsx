import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MenuItem, Select, Avatar } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import avatarImage from "../assets/avatar.jpeg";
import { useLanguage } from "../hooks/useSession";

function Navbar() {
  const { language, onChangeLanguage } = useLanguage();

  return (
    <AppBar
      position="static"
      sx={{
        mb: 3,
        boxShadow: "none",
        height: { xs: 50, sm: 60 },
        backgroundColor: "white",
      }}
    >
      <Toolbar disableGutters>
        <Box
          height={{ xs: 50, sm: 60 }}
          width={{ xs: 50, sm: 200 }}
          maxWidth={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRight="2px solid #E8E8E8"
          borderBottom="2px solid #E8E8E8"
        >
          <AutoStoriesIcon
            color="action"
            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              color: "black",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              display: { xs: "none", md: "flex" },
            }}
          >
            LOGO
          </Typography>
        </Box>

        <Box
          gap={3}
          flex={1}
          flexGrow={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
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
            William
          </Typography>

          <Avatar src={avatarImage} />

          <Select
            value={language}
            sx={{ borderRadius: 10, textAlign: "center" }}
            onChange={(e) => onChangeLanguage(e.target.value as 0 | 1)}
          >
            <MenuItem value={0}>English</MenuItem>
            <MenuItem value={1}>Arabic</MenuItem>
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
