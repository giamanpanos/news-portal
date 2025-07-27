import { FC } from "react";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { NewsType } from "../utils/types";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";

interface CarouselCardType {
  topHeadline: NewsType;
  toggleActive: (direction: "next" | "prev") => void;
}

const CarouselCard: FC<CarouselCardType> = ({ topHeadline, toggleActive }) => {
  const newContent = topHeadline?.content?.replace(/\[[^\]]*\]/g, "");

  return (
    <Box className="relative">
      <Card className="grid lg:grid-cols-2 md:grid-cols-3 border-2 shadow-none">
        <Box className="relative md:h-[360px] h-[280px] lg:col-span-1 md:col-span-2">
          <Link to={topHeadline?.url} target="_blank">
            <CardMedia
              component="img"
              className="h-full"
              image={topHeadline?.urlToImage}
            />
          </Link>
          <Box
            className="_carouselGradient"
            sx={{
              position: "absolute",
              bottom: 0,
              height: "70px",
              width: "100%",
            }}
          />
          <Typography
            sx={{ fontFamily: "sefif" }}
            className="absolute bottom-2 text-white md:text-[22px] sm:text-xl text-lg leading-8 line-clamp-3 px-6"
          >
            {topHeadline?.title}
          </Typography>
        </Box>

        <CardContent className="relative">
          <Typography
            gutterBottom
            className="sm:text-xl text-lg font-serif line-clamp-3"
          >
            {topHeadline?.description}
          </Typography>
          <Typography className="sm:text-xl text-lg font-serif line-clamp-4">
            {newContent}{" "}
            <Link
              to={topHeadline?.url}
              target="_blank"
              className="underline hover:no-underline"
            >
              Learn More
            </Link>
          </Typography>

          <Box className="md:absolute bottom-2">
            <Typography className="sm:text-xl text-lg font-serif line-clamp-4">
              Source: {topHeadline?.source.name}
            </Typography>
            <Typography className="sm:text-xl text-lg font-serif line-clamp-4">
              Date: {new Date(topHeadline?.publishedAt).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <KeyboardArrowLeftIcon
        className="absolute top-0 top-1/2 left-1 bg-neutral-800 text-white text-4xl rounded-full cursor-pointer"
        onClick={() => toggleActive("prev")}
      />
      <KeyboardArrowRightIcon
        className="absolute top-0 top-1/2 right-1 bg-neutral-800 text-white text-4xl rounded-full cursor-pointer"
        onClick={() => toggleActive("next")}
      />
    </Box>
  );
};

export default CarouselCard;
