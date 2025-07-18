import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.default,
  opacity: 1,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#00000099",
  border: "1px solid #a3abb966",
  borderRadius: theme.shape.borderRadius,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SearchBar() {
  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon sx={{ fill: "#00000099" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search notes..."
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </>
  );
}
