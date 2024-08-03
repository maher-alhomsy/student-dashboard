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
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { loginEvent } from "../lib/http";
import LoginImage from "../assets/image.png";
import { LoginData, loginScheme } from "../lib/validator";
import { useLanguage, useSession } from "../hooks/useSession";

const LoginPage = () => {
  const navigate = useNavigate();
  const { onLogin } = useSession();

  const { language, onChangeLanguage } = useLanguage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginScheme),
    values: { password: "", userName: "" },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginEvent,
    onSuccess: ({ token, userName }) => {
      onLogin({ token, userName });
      navigate("dashboard");
    },
  });

  const submitHandler = ({ password, userName }: LoginData) => {
    mutate({ password, userName });
  };

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
          <Select
            value={language}
            sx={{ borderRadius: 10, width: 150, textAlign: "center" }}
            onChange={(e) => onChangeLanguage(e.target.value as 0 | 1)}
          >
            <MenuItem value={0}>English</MenuItem>
            <MenuItem value={1}>Arabic</MenuItem>
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

            <Controller
              name="userName"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <>
                  <InputLabel htmlFor="username">Username</InputLabel>

                  <TextField
                    fullWidth
                    name={name}
                    value={value}
                    id="username"
                    sx={{ mb: 3 }}
                    onChange={onChange}
                    error={Boolean(errors.userName)}
                    helperText={errors.userName?.message}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { name, value, onChange } }) => (
                <>
                  <InputLabel htmlFor="password">Password</InputLabel>

                  <TextField
                    fullWidth
                    name={name}
                    value={value}
                    id="password"
                    sx={{ mb: 1 }}
                    onChange={onChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />
                </>
              )}
            />

            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              disabled={isPending}
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(submitHandler)}
            >
              Sign In
            </Button>

            {isError && (
              <p style={{ fontWeight: "bold", color: "red" }}>
                {/* @ts-ignore */}
                {error.response.data}
              </p>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
