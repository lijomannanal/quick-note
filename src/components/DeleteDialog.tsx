import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteDialog({ open, onClose, onConfirm }: Props) {
  const onDialogClose = (_: Event, reason: string) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    onClose();
  };
  return (
    <Dialog open={open} onClose={onDialogClose}>
      <DialogTitle sx={{ color: "text.primary" }}>Delete note?</DialogTitle>
      <DialogContent sx={{ color: "text.primary" }}>
        <Typography>Are you sure you want to delete this note?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
