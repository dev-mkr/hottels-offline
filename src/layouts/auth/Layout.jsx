import { Box, CardMedia, Unstable_Grid2 as Grid } from "@mui/material";

const Page = ({ children }) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: "1 1",
          // height: "100vh",
        }}
      >
        <Grid container sx={{ flex: "1 1 auto" }}>
          <Grid
            xs={12}
            lg={6}
            sx={{
              backgroundColor: "background.paper",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/*  */}
            {children}
            {/*  */}
          </Grid>
          <Grid
            sx={{
              flex: 1,
              height: "100vh",
              width: 32,
              "& img": {
                maxWidth: "100%",
                maxHeight: "100%",
              },
            }}
          >
            <CardMedia
              component="img"
              image="https://source.unsplash.com/random/400*700/?hotel"
              alt="sea view background"
              sx={{ height: "100%" }}
            />
            {/* <CardMedia component="img" image="/assets/sea-view-bg.jpg" alt="sea view background" /> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;
