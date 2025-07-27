import { FC, useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { NewsType } from "../utils/types";
import ExploreCardsList from "../components/ExploreCardsList";
import NewsCardSkeleton from "../components/Skeletons/NewsCardSkeleton";
import allNews from "../utils/newsByCategory.json";

const Search: FC = () => {
  const [searchedData, setSearchedData] = useState<NewsType[]>([]);

  const location = useLocation();
  const { title, query } = location.state;

  const [loading, setLoading] = useState<boolean>(true);

  const fetchSearch = async () => {
    setLoading(true);

    const allNewsArticles = [];
    for (const category in allNews) {
      // @ts-expect-error: Issue with the type
      const articles = allNews[category].articles;

      // Loop through each article
      for (const article of articles) {
        allNewsArticles.push(article);
      }
    }

    console.log(allNewsArticles);

    allNewsArticles.map((article) => {
      if (
        article.title?.toLowerCase().includes(query.toLowerCase()) ||
        article.description?.toLowerCase().includes(query.toLowerCase())
      ) {
        setSearchedData((prev) => [...prev, article]);
      }
    });

    setLoading(false);
  };

  useEffect(() => {
    setSearchedData([]);
    fetchSearch();
    // eslint-disable-next-line
  }, [query]);

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
        {title}
      </Typography>

      <>
        {loading && (
          <Box className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {[...Array(20)].map((_, index) => (
              <NewsCardSkeleton key={index} />
            ))}
          </Box>
        )}

        {searchedData.length > 0 ? (
          <ExploreCardsList loading={loading} list={searchedData} />
        ) : (
          <Box className="text-red-600">No results found for "{query}"</Box>
        )}

        {/* <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            disableElevation
            className="bg-neutral-700"
            onClick={() => fetchSearch()}
          >
            Load More
          </Button>
        </Box> */}
      </>
    </Container>
  );
};

export default Search;
