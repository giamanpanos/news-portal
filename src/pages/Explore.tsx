import { FC, useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { NewsType } from "../utils/types";
import ExploreCardsList from "../components/ExploreCardsList";
import NewsCardSkeleton from "../components/Skeletons/NewsCardSkeleton";
import newsByCategory from "../utils/newsByCategory.json";

interface categoryDataType {
  [key: string]: { articles: NewsType[] };
}

const Explore: FC = () => {
  const location = useLocation();
  const category = location.state?.category;

  const [categoryData, setCategoryData] = useState<categoryDataType>({});
  const [loadMore, setLoadMore] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);

  const fetchNews = async () => {
    setLoading(true);

    if (!category) return;
    let finalNews = [];
    // @ts-expect-error: Issue with the type
    const filteredNews = newsByCategory[category].articles;

    if (
      filteredNews.length <= 20 &&
      categoryData[category]?.articles?.length === undefined
    ) {
      finalNews = filteredNews.slice(0, filteredNews.length);
    } else if (
      filteredNews.length > 20 &&
      categoryData[category]?.articles?.length === undefined
    ) {
      finalNews = filteredNews.slice(0, 19);
    } else if (
      filteredNews.length > 20 &&
      filteredNews.length <= 40 &&
      categoryData[category]?.articles?.length > 0 &&
      categoryData[category]?.articles?.length < 20
    ) {
      finalNews = filteredNews.slice(20, filteredNews.length);
    } else if (
      filteredNews.length > 40 &&
      categoryData[category]?.articles?.length > 0 &&
      categoryData[category]?.articles?.length < 20
    ) {
      finalNews = filteredNews.slice(20, 39);
    } else if (
      filteredNews.length > 40 &&
      filteredNews.length <= 60 &&
      categoryData[category]?.articles?.length > 20 &&
      categoryData[category]?.articles?.length < 40
    ) {
      finalNews = filteredNews.slice(40, filteredNews.length);
    } else if (
      filteredNews.length > 60 &&
      categoryData[category]?.articles?.length > 20 &&
      categoryData[category]?.articles?.length < 40
    ) {
      finalNews = filteredNews.slice(40, 59);
    } else if (
      filteredNews.length > 60 &&
      filteredNews.length <= 80 &&
      categoryData[category]?.articles?.length > 40 &&
      categoryData[category]?.articles?.length < 60
    ) {
      finalNews = filteredNews.slice(60, filteredNews.length);
    } else if (
      filteredNews.length > 80 &&
      categoryData[category]?.articles?.length > 40 &&
      categoryData[category]?.articles?.length < 60
    ) {
      finalNews = filteredNews.slice(60, 79);
    } else {
      finalNews = filteredNews;
    }

    setCategoryData((prevData) => ({
      ...prevData,
      [category]: {
        articles: [...(prevData[category]?.articles || []), ...finalNews],
      },
    }));

    setLoading(false);
  };

  useEffect(() => {
    setCategoryData({});
    fetchNews();
    // eslint-disable-next-line
  }, [category]);

  useEffect(() => {
    // @ts-expect-error: Issue with the type
    const filteredNews = newsByCategory[category].articles;
    setLoadMore(
      categoryData[category]?.articles.length < filteredNews.length - 5 ||
        isNaN(categoryData[category]?.articles.length)
    );
  }, [category, categoryData]);

  return (
    <Container maxWidth={false} sx={{ width: "90%", mt: 5, mb: 10 }}>
      <Typography
        variant="h4"
        sx={{
          fontSize: { md: "2.25rem", xs: "1.5rem" },
          fontFamily: "serif",
          cursor: "pointer",
          mb: 1,
        }}
      >
        {category}
      </Typography>

      <>
        {categoryData[category]?.articles?.length > 0 ? (
          <ExploreCardsList
            list={categoryData[category]?.articles}
            loading={loading}
          />
        ) : (
          <Box className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {[...Array(20)].map((_, index) => (
              <NewsCardSkeleton key={index} />
            ))}
          </Box>
        )}

        <Box display="flex" justifyContent="center" mt={3}>
          {loadMore && (
            <Button
              variant="contained"
              disableElevation
              className="bg-neutral-700"
              onClick={() => fetchNews()}
            >
              Load More
            </Button>
          )}
        </Box>
      </>
    </Container>
  );
};

export default Explore;
