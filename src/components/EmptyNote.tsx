import { Box, Typography } from "@mui/material";

type Props = {
  caption: string;
  imagePath: string;
  altText: string;
};

export default function EmptyNote({ caption, imagePath, altText }: Props) {
  return (
    <Box textAlign="center" sx={{ width: "80%" }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        {caption}
      </Typography>
      <img
        src={imagePath}
        alt={altText}
        style={{ width: "20rem", height: "345px", marginTop: 20 }}
      />
    </Box>
  );
}
