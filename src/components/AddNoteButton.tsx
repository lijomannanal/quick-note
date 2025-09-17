import { Button, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Device } from "../constants";

type Props = {
  onClick: () => void;
};

export default function AddNoteButton({ onClick }: Props) {
  const isMobile = useMediaQuery(Device.Mobile);
  return (
    <Button
      onClick={onClick}
      variant="contained"
      startIcon={<AddIcon />}
      sx={{ ml: 2, whiteSpace: "nowrap", minWidth: isMobile ? 40 : "auto" }}
    >
      {isMobile ? "Add" : "Add Note"}
    </Button>
  );
}
