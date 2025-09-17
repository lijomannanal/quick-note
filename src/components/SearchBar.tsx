import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.default,
  opacity: 1,
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
  color: theme.palette.text.primary,
  border: "1px solid #a3abb966",
  borderRadius: theme.shape.borderRadius,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

type Props = {
  searchText: string;
  placeholder: string;
  onSearch: (text: string) => void;
};

export default function SearchBar({
  searchText,
  placeholder,
  onSearch,
}: Props) {
  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon
            sx={{
              color: "text.primary",
              height: "1.2rem",
              width: "1.2rem",
            }}
          />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={placeholder}
          inputProps={{ "aria-label": "search" }}
          value={searchText}
          onChange={(event) => onSearch(event.target.value)}
        />
      </Search>
    </>
  );
}
