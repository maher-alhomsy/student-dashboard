import { Box, Button, Modal, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import LogoutIcon from "@mui/icons-material/Logout";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SignoutModal = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const { onLogout } = useSession();

  const signoutHandler = () => {
    onClose();
    onLogout();
    navigate("/");
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        component="div"
        sx={{
          width: 470,
          top: "50%",
          left: "50%",
          boxShadow: 24,
          borderRadius: 3,
          overflow: "hidden",
          position: "absolute",
          bgcolor: "background.paper",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          height={150}
          display="flex"
          borderRadius={3}
          bgcolor="#1F7BF4"
          alignItems="center"
          justifyContent="center"
        >
          <LogoutIcon
            fontSize="large"
            sx={{ color: "#fff", width: 70, height: 70 }}
          />
        </Box>

        <Box p={5}>
          <Typography
            variant="h5"
            component="h1"
            color="#1F7BF4"
            sx={{ mb: 2 }}
            textAlign="center"
          >
            Sign out
          </Typography>

          <Typography component="p" sx={{ mb: 1 }} textAlign="center">
            Are you sure you would like to sign out of your account?
          </Typography>

          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              // disabled={isPending}
              onClick={signoutHandler}
              sx={{ borderRadius: 10 }}
            >
              Sign out
            </Button>

            <Button
              fullWidth
              color="primary"
              variant="outlined"
              onClick={onClose}
              // disabled={isPending}
              sx={{ borderRadius: 10 }}
            >
              Cancle
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignoutModal;
