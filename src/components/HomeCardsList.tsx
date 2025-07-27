import { FC, useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import NewsCard from "./NewsCard";
import { getTopHeadLines } from "../utils/api";
import { NewsType } from "../utils/types";
import HeaderSection from "./HeaderSection";
import NewsCardSkeleton from "./Skeletons/NewsCardSkeleton";

interface HomeCardsListProps {
  category: string;
}

const HomeCardsList: FC<HomeCardsListProps> = ({ category }) => {
  const [catNews, setCatNews] = useState<NewsType[]>([]);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategoryNews = async () => {
    setLoading(true);
    setError(null);

    const response = await getTopHeadLines(category);

    if (response.data) {
      const filterCatNews = response?.data?.articles.filter(
        (res: NewsType) => res.urlToImage != null
      );

      setCatNews(filterCatNews);
      setLoading(false);

      localStorage.setItem(
        "catNews",
        JSON.stringify({
          ...catNews,
          ...filterCatNews,
        })
      );
    }

    if (response.error) {
      const storedcatNews = localStorage.getItem("catNews");
      // @ts-expect-error: Issue with the type
      const parsedcatNews = JSON.parse(storedcatNews);
      // @ts-expect-error: Issue with the type
      let localStoragecatNews = [];

      if (parsedcatNews) {
        localStoragecatNews = Object.values(parsedcatNews);
      }

      if (localStoragecatNews.length > 0) {
        // @ts-expect-error: Issue with the type
        setCatNews(localStoragecatNews);
        setLoading(false);
      } else {
        setError(response.error.message || "Failed To Fetch Data");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCategoryNews();
  }, []);

  return (
    <>
      <HeaderSection title={category} />
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
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
      )}
    </>
  );
};

export default HomeCardsList;
