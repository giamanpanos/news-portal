import { FC } from "react";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { NewsType } from "../utils/types";
import { Link } from "react-router-dom";

interface NewsCardProps {
  item: NewsType;
}

const NewsCard: FC<NewsCardProps> = ({ item }) => {
  return (
    <Card className="relative shadow-none border-2 h-[450px]">
      {/* <Box className="bg-red-300 aspect-[16/9] h-[180px]" /> */}
      <Link to={item.url} target="_blank">
        <CardMedia
          component="img"
          image={item.urlToImage}
          className="aspect-[16/9] h-[180px]"
        />
      </Link>
      <CardContent className="mb-12">
        <Typography className="text-[16px] font-serif line-clamp-4">
          {item.title}
        </Typography>
        <Typography className="text-[14px] font-serif line-clamp-4">
          {item.description}
        </Typography>

        <Box className="absolute bottom-2">
          <Typography className="text-[14px] font-serif line-clamp-4">
            Source: {item.source.name}
          </Typography>
          <Typography className="text-[14px] font-serif line-clamp-4">
            Date: {new Date(item.publishedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
