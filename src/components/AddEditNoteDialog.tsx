import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import type { INote, INoteSchema } from "../models/Note";
import { NoteCategory } from "../constants";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (params: INoteSchema) => void;
  note?: INote;
};

export default function AddEditNoteDialog({
  open,
  note,
  onClose,
  onSubmit,
}: Props) {
  const { control, handleSubmit, reset } = useForm<INoteSchema>();

  const onSave = (data: INoteSchema) => {
    onSubmit(data);
    if (!note) {
      reset();
    } else {
      onClose();
    }
  };

  const onFormClose = () => {
    reset();
    onClose();
  };
  const onDialogClose = (_: Event, reason: string) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    onFormClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onDialogClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(onSave)}>
          <DialogTitle sx={{ color: "text.primary" }}>Add note</DialogTitle>
          <DialogContent sx={{ overflow: "hidden" }}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: "Title is required",
                    maxLength: {
                      value: 50,
                      message: "Title cannot exceed 20 characters",
                    },
                  }}
                  defaultValue={note?.title ?? ""}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Title"
                      variant="filled"
                      fullWidth
                      margin="normal"
                      error={!!error?.message}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  defaultValue={note?.category ?? NoteCategory.DEFAULT}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      select
                      label="Category"
                      variant="filled"
                      fullWidth
                      margin="normal"
                      error={!!error?.message}
                      helperText={error?.message}
                    >
                      {Object.values(NoteCategory).map((cat) => (
                        <MenuItem
                          key={cat}
                          value={cat}
                          sx={{ color: "text.primary" }}
                        >
                          {cat}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="content"
                  control={control}
                  rules={{
                    required: "Description is required",
                    maxLength: {
                      value: 500,
                      message: "Description cannot exceed 500 characters",
                    },
                  }}
                  defaultValue={note?.content ?? ""}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Description"
                      variant="filled"
                      multiline
                      rows={6}
                      fullWidth
                      margin="normal"
                      error={!!error?.message}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onFormClose} sx={{ color: "primary.main" }}>
              Cancel
            </Button>
            <Button type="submit" sx={{ color: "primary.main" }}>
              {note ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
