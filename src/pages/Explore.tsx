import { FC, useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { NewsType } from "../utils/types";
import { getTopHeadLines } from "../utils/api";
import ExploreCardsList from "../components/ExploreCardsList";
import NewsCardSkeleton from "../components/Skeletons/NewsCardSkeleton";

interface categoryDataType {
  [key: string]: { articles: NewsType[]; pageNo: number };
}

const Explore: FC = () => {
  const location = useLocation();
  const category = location.state?.category;

  const [categoryData, setCategoryData] = useState<categoryDataType>({});
  const [hiddenData, setHiddenData] = useState<categoryDataType>({});
  const [loadMore, setLoadMore] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>("");

  const fetchNews = async () => {
    setError(null);
    setLoading(true);
    const currentCategorydata = categoryData[category] || {
      articles: [],
      pageNo: 1,
    };
    const hiddenCategorydata = hiddenData[category] || {
      articles: [],
      pageNo: 1,
    };
    const pageNo = currentCategorydata.pageNo;

    if (!category) return;

    const response = await getTopHeadLines(category, pageNo);

    if (response.data) {
      const filteredNews = response.data?.articles.filter(
        (res: NewsType) => res.urlToImage != null
      );

      setCategoryData((prevData) => ({
        ...prevData,
        [category]: {
          articles: [...(prevData[category]?.articles || []), ...filteredNews],
          pageNo: pageNo + 1,
        },
      }));

      const hiddenNews = response.data?.articles.filter(
        (res: NewsType) => res.urlToImage == null
      );

      setHiddenData((prevData) => ({
        ...prevData,
        [category]: {
          articles: [...(prevData[category]?.articles || []), ...hiddenNews],
        },
      }));

      localStorage.setItem(
        "categoryData",
        JSON.stringify({
          ...categoryData,
          [category]: {
            articles: [
              ...(categoryData[category]?.articles || []),
              ...filteredNews,
            ],
          },
        })
      );

      setLoadMore(
        currentCategorydata.articles.length +
          filteredNews.length +
          hiddenCategorydata?.articles.length <=
          response.data.totalResults - 5
      );

      setLoading(false);
    }

    if (response.error) {
      const storedCategoryData = localStorage.getItem("categoryData");
      // @ts-expect-error: Issue with the type
      const parsedCategoryData = JSON.parse(storedCategoryData);
      const localStorageCategoryData = parsedCategoryData || [];

      if (Object.keys(localStorageCategoryData).length > 0) {
        setCategoryData(localStorageCategoryData);
        setLoading(false);
        setLoadMore(false);
      } else {
        setError(response.error.message || "Failed To Fetch Data");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  console.log(categoryData);

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

      {error && (
        <Typography color="error" mb={3}>
          {error}
        </Typography>
      )}

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
