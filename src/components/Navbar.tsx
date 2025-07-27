import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  InputBase,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { categories } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate("/search", {
        state: { title: `What we found for ${search}`, query: search },
      });
      setSearch("");
    }
  };

  const handleSearchIconClick = () => {
    setSearch("");
    navigate("/search", {
      state: { title: `What we found for ${search}`, query: search },
    });
  };

  return (
    <Box className="bg-neutral-900 text-white">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: { sm: "90%", xs: "95%" },
          mx: "auto",
          py: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontSize: { md: "1.5rem", sm: "1.25rem", xs: "1rem" },
            fontFamily: "serif",
          }}
          onClick={() => navigate("/")}
        >
          <Typography
            sx={{
              fontSize: "inherit",
              fontFamily: "inherit",
              fontWeight: "bold",
            }}
          >
            NEWS
          </Typography>
          <Typography
            sx={{
              fontSize: "inherit",
              fontFamily: "inherit",
              fontWeight: "light",
            }}
          >
            Daily
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            bgcolor: "black",
            color: "#c2c2c2",
            px: { sm: 4, xs: 3 },
            borderRadius: "999px",
          }}
        >
          <SearchIcon onClick={handleSearchIconClick} />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ bgcolor: "gray" }}
          />
          {/*A vertical space */}
          <InputBase
            placeholder="Search"
            sx={{
              color: "white",
              width: { md: "350px", sm: "300px", xs: "180px" },
              height: "2.5rem",
              fontSize: { sm: "1rem", xs: "0.875rem" },
              fontFamily: "serif",
              "&::placeholder": {
                color: "#646464",
              },
            }}
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </Box>
      </Box>
      <ButtonGroup
        className="bg-neutral-800 w-full overflow-x-auto rounded-none"
        sx={{
          "& .MuiButton-root": {
            color: "white",
          },
        }}
        variant="text"
      >
        {categories.map((item, index) => (
          <Button
            key={index}
            sx={{ fontSize: { md: "16px", sm: "13px", xs: "12px" } }}
            className="min-w-fit w-full hover:bg-neutral-900"
            onClick={() => navigate("/explore", { state: { category: item } })}
          >
            {item}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default Navbar;
