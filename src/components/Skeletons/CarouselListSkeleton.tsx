import { Box, Card, Grid2, Skeleton } from "@mui/material";
import { FC } from "react";

const CarouselListSkeleton: FC = () => {
  return (
    <Box>
      <Box className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 mt-8">
        {[...Array(5)].map((_, index) => (
          <Grid2 key={index}>
            <Card className="relative h-[200px]">
              <Skeleton variant="rectangular" width={"100%"}>
                <Box className="aspect-[16/10]"></Box>
                {/* The above Box element was added so that the skeleton of the items will have the correct height */}
              </Skeleton>
            </Card>
          </Grid2>
        ))}
      </Box>
    </Box>
  );
};

export default CarouselListSkeleton;
