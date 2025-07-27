import { FC } from "react";

import { Box } from "@mui/material";
import Carousel from "../components/Carousel";
import HomeCardsList from "../components/HomeCardsList";
import { categories } from "../utils/constants";

const Home: FC = () => {
  return (
    <Box sx={{ width: "90%", mx: "auto" }}>
      <Carousel />
      {/* News Cards List */}
      <Box className="mt-4 mb-24">
        <Box>
          {categories.map((item: string, index: number) => (
            <HomeCardsList key={index} category={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
