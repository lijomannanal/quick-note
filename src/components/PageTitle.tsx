import { Typography } from "@mui/material";
type Props = {
  text: string;
};

export default function PageTitle({ text }: Props) {
  return (
    <Typography sx={{ color: "text.title" }} variant="h5">
      {text}
    </Typography>
  );
}
