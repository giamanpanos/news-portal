import { FC, useEffect, useState } from "react";

import { Box } from "@mui/material";
import HeaderSection from "./HeaderSection";
import CarouselCard from "./CarouselCard";
import CarouselList from "./CarouselList";
import { NewsType } from "../utils/types";
import CarouselCardSkeleton from "./Skeletons/CarouselCardSkeleton";
import CarouselListSkeleton from "./Skeletons/CarouselListSkeleton";
import allNews from "../utils/newsByCategory.json";
import { categories } from "../utils/constants";

const Carousel: FC = () => {
  const [active, setActive] = useState<number>(0);
  const [topHeadlines, setTopHeadlines] = useState<NewsType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const newsCategories = Math.floor(Math.random() * categories.length);

  const fetchTopHeadlines = async () => {
    setLoading(true);

    // @ts-expect-error: Issue with the type
    const filterHeadlines = allNews[categories[newsCategories]].articles.slice(
      0,
      20
    );

    setTopHeadlines(filterHeadlines);
    setLoading(false);
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
    </Box>
  );
};

export default Carousel;
