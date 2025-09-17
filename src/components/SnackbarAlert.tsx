import { Alert, Snackbar } from "@mui/material";
import type { SnackbarVariants } from "../models/common";

type Props = {
  open: boolean;
  message: string;
  handleClose: () => void;
  variant: SnackbarVariants;
};

export default function SnackbarAlert({
  open,
  handleClose,
  message,
  variant,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={variant}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
