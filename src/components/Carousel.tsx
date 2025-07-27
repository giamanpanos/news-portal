import { FC, useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import HeaderSection from "./HeaderSection";
import CarouselCard from "./CarouselCard";
import CarouselList from "./CarouselList";
import { NewsType } from "../utils/types";
import { getTopHeadLines } from "../utils/api";
import CarouselCardSkeleton from "./Skeletons/CarouselCardSkeleton";
import CarouselListSkeleton from "./Skeletons/CarouselListSkeleton";

const Carousel: FC = () => {
  const [active, setActive] = useState<number>(0);
  const [topHeadlines, setTopHeadlines] = useState<NewsType[]>([]);

  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTopHeadlines = async () => {
    setLoading(true);
    setError(null);

    const response = await getTopHeadLines();

    if (response.data) {
      const filterHeadlines = response.data?.articles.filter(
        (res: NewsType) => res.urlToImage != null
      );
      setTopHeadlines(filterHeadlines);
      setLoading(false);

      localStorage.setItem(
        "topHeadlines",
        JSON.stringify({
          ...topHeadlines,
          ...filterHeadlines,
        })
      );
    }

    if (response.error) {
      const storedTopHeadlines = localStorage.getItem("topHeadlines");
      // @ts-expect-error: Issue with the type
      const parsedTopHeadlines = JSON.parse(storedTopHeadlines);
      // @ts-expect-error: Issue with the type
      let localStorageTopHeadlines = [];

      if (parsedTopHeadlines) {
        localStorageTopHeadlines = Object.values(parsedTopHeadlines);
      }

      if (localStorageTopHeadlines.length > 0) {
        // @ts-expect-error: Issue with the type
        setTopHeadlines(localStorageTopHeadlines);
        setLoading(false);
      } else {
        setError(response.error.message || "Failed To Fetch Data");
        setLoading(false);
      }
    }
  };

  const toggleActive = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActive((prev) => (prev + 1) % topHeadlines.length); // the remainder is used for the last item
    } else if (direction === "prev") {
      if (active === 0) {
        setActive(topHeadlines.length);
      }
      setActive((prev) => (prev - 1) % topHeadlines.length); // the remainder is used for the 1st item
    }
  };

  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  return (
    <Box>
      {/* Header */}
      <HeaderSection title="Top Headlines" />

      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {loading ? (
            <>
              <CarouselCardSkeleton />
              <CarouselListSkeleton />
            </>
          ) : (
            <Box>
              {/* Carousel */}
              <CarouselCard
                topHeadline={topHeadlines[active]}
                toggleActive={toggleActive}
              />

              {/* Carousel List */}
              <CarouselList topHeadlines={topHeadlines} active={active} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Carousel;
