import { FC, useEffect, useState } from "react";

import { Box } from "@mui/material";
import NewsCard from "./NewsCard";
import { NewsType } from "../utils/types";
import HeaderSection from "./HeaderSection";
import NewsCardSkeleton from "./Skeletons/NewsCardSkeleton";
import newsByCategory from "../utils/newsByCategory.json";

interface HomeCardsListProps {
  category: string;
}

const HomeCardsList: FC<HomeCardsListProps> = ({ category }) => {
  const [catNews, setCatNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategoryNews = async () => {
    setLoading(true);

    // @ts-expect-error: Issue with the type
    const filterCatNews = newsByCategory[category].articles;

    setCatNews(filterCatNews);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryNews();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HeaderSection title={category} />
      {loading ? (
        <Box className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          {[...Array(5)].map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </Box>
      ) : (
        <Box className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          {catNews.slice(0, 5).map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}
        </Box>
      )}
    </>
  );
};

export default HomeCardsList;
