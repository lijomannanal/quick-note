import {
  Card,
  Typography,
  IconButton,
  CardContent,
  Box,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnArchiveIcon from "@mui/icons-material/Unarchive";
import { useMemo } from "react";
import { convertDateToLocalString } from "../utils";
import { Device, NoteCategory, TabColors } from "../constants";

type Props = {
  id: number;
  title: string;
  content: string;
  date: Date;
  category: NoteCategory;
  isArchived: string;
  onEdit?: (id: number) => void;
  onArchive?: (id: number) => void;
  onUnArchive?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function NoteCard(props: Props) {
  const {
    id,
    title,
    content,
    date,
    category,
    isArchived,
    onEdit,
    onArchive,
    onDelete,
    onUnArchive,
  } = props;
  const isMobile = useMediaQuery(Device.Mobile);
  const isTablet = useMediaQuery(Device.Tablet);

  const formattedDate = useMemo(() => {
    return convertDateToLocalString(date);
  }, [date]);

  return (
    <Card
      sx={{
        backgroundColor:
          TabColors[category as unknown as keyof typeof TabColors],
        color: "#fff",
        width: isMobile ? "340px" : isTablet ? "370px" : "390px",
        mt: 2,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Box>
            {isArchived === "no" ? (
              <>
                <IconButton
                  title="Edit"
                  onClick={() => onEdit?.(id)}
                  size="small"
                  sx={{ color: "primary.cardIcon" }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  title="Archive"
                  onClick={() => onArchive?.(id)}
                  size="small"
                  sx={{ color: "primary.cardIcon" }}
                >
                  <ArchiveIcon fontSize="small" />
                </IconButton>
                <IconButton
                  title="Delete"
                  onClick={() => onDelete?.(id)}
                  size="small"
                  sx={{ color: "primary.cardIcon" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              <IconButton
                title="Unarchive"
                onClick={() => onUnArchive?.(id)}
                size="small"
                sx={{ color: "primary.cardIcon" }}
              >
                <UnArchiveIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: 62,
          }}
        >
          {content}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  );
}
