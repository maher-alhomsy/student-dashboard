import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  Container,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";

import LoginImage from "../assets/image.png";

const LoginPage = () => {
  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}
      >
        <Grid
          item
          md={5}
          xs={12}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Select defaultValue="en" sx={{ maxWidth: "100px", mt: 3 }}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ar">Arabic</MenuItem>
          </Select>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img alt="login" src={LoginImage} style={{ maxWidth: "100%" }} />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          sx={{
            py: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2148C0",
          }}
        >
          <Box
            component="form"
            sx={{
              p: 3,
              mt: 1,
              width: "80%",
              borderRadius: 3,
              backgroundColor: "white",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Login
            </Typography>

            <Box>
              <InputLabel sx={{ mb: -1 }} htmlFor="username">
                Username
              </InputLabel>

              <TextField
                fullWidth
                id="username"
                name="username"
                margin="normal"
              />
            </Box>

            <Box>
              <InputLabel sx={{ mb: -1 }} htmlFor="password">
                Password
              </InputLabel>

              <TextField
                fullWidth
                id="password"
                name="password"
                margin="normal"
              />
            </Box>

            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
