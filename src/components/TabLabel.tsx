import { Box, Typography } from "@mui/material";

type Props = {
  indicatorColor?: string;
  label: string;
  color: string;
};

export default function TabLabel({ indicatorColor, label, color }: Props) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {indicatorColor && (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: indicatorColor,
          }}
        />
      )}
      <Typography sx={{ color }}>{label}</Typography>
    </Box>
  );
}
