import { FC } from "react";
import { Box } from "@mui/material";
import { NewsType } from "../utils/types";
import NewsCard from "./NewsCard";
import NewsCardSkeleton from "./Skeletons/NewsCardSkeleton";

interface ExploreCardsListProps {
  list?: NewsType[];
  loading: boolean;
}

const ExploreCardsList: FC<ExploreCardsListProps> = ({ list, loading }) => {
  return (
    <Box className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
      {list?.map((item, index) => (
        <NewsCard item={item} key={index} />
      ))}
      {loading &&
        [...Array(10)].map((_, index) => <NewsCardSkeleton key={index} />)}
    </Box>
  );
};

export default ExploreCardsList;
