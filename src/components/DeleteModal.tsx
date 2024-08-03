import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { queryClient } from "../main";
import { deleteStudent } from "../lib/http";
import { useSession } from "../hooks/useSession";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DeleteModal = ({ isOpen, onClose }: Props) => {
  const { token } = useSession();

  const navigate = useNavigate();
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-student"],
    mutationFn: deleteStudent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-students"] });
      onClose();
      params.delete("student-id");
      navigate({ search: params.toString() });
    },
  });

  const confirmHandler = () => {
    const studentId = params.get("student-id")!;
    mutate({ id: studentId, token: token! });
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
          bgcolor="#F34235"
          alignItems="center"
          justifyContent="center"
        >
          <InfoOutlinedIcon
            fontSize="large"
            sx={{ color: "#fff", width: 70, height: 70 }}
          />
        </Box>

        <Box p={5}>
          <Typography
            color="red"
            variant="h5"
            component="h1"
            sx={{ mb: 2 }}
            textAlign="center"
          >
            Are you sure
          </Typography>

          <Typography component="p" sx={{ mb: 1 }} textAlign="center">
            Are you sure you want to delete this student's information? This
            action cannot be undone.
          </Typography>

          <Typography
            color="red"
            component="p"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            This action cannot be undone.
          </Typography>

          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              fullWidth
              color="error"
              variant="contained"
              disabled={isPending}
              onClick={confirmHandler}
              sx={{ borderRadius: 10 }}
            >
              Delete
            </Button>

            <Button
              fullWidth
              color="error"
              variant="outlined"
              onClick={onClose}
              disabled={isPending}
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

export default DeleteModal;
