import React from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
// import { useMutation } from '@apollo/client';

import { QUERY_SINGLE_POSTING } from "../utils/queries";

import { Image } from "cloudinary-react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const Posting = () => {
  const { postingId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POSTING, {
    variables: { postingId: postingId },
  });

  const posting = data?.posting || {};

  console.log("posting");
  console.log(posting);

  // THIS IS FOR THE TABS SECTION AND FUNCTION
  const [tabAID, setTabAID] = useState(0);
  const [tabBID, setTabBID] = useState(0);

  const handleTabAChange = (event, newValue) => {
    setTabAID(newValue);
  };

  function TabPanelOne(props) {
    const { children, value, index } = props;
    return <Box>{value === index && <h1>{children}</h1>}</Box>;
  }

  const handleTabBChange = (event, newValue) => {
    setTabBID(newValue);
  };

  function TabPanelTwo(props) {
    const { children, value, index } = props;
    return <Box>{value === index && <h1>{children}</h1>}</Box>;
  }

  const theme = createTheme();

  theme.typography.h1 = {
    fontFamily: "Cabin",
    fontSize: "2em",
  };

  theme.typography.sub1 = {
    fontFamily: "Alata",
    fontSize: "1.35em",
    height: "2rem",
  };

  theme.typography.description = {
    fontFamily: "Alata",
    fontSize: "0.7em",
    fontWeight: "100",
  };

  if (loading) {
    return <Box>Grabbing Posts</Box>;
  }

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            item
            md={10}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Grid item md={5.5}>
              {(function () {
                if (posting.imageid === null || posting.imageid === "N/A") {
                  return (
                    <Image
                      width="100%"
                      cloudName="du119g90a"
                      public_id="https://res.cloudinary.com/du119g90a/image/upload/v1639609335/noimagegame_uvzgky.jpg"
                    />
                  );
                } else {
                  return (
                    <Image
                      width="100%"
                      cloudName="du119g90a"
                      public_id={posting.imageid}
                    />
                  );
                }
              })()}
            </Grid>

            <Grid
              item
              md={4.5}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Grid item sx={{ mb: 3 }}>
                  <Typography variant="h1">{posting.title}</Typography>
                </Grid>

                {(function () {
                  if (posting.category === "Console") {
                    return (
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="sub1">
                          Post Date: {posting.createdAt}
                        </Typography>
                        <Typography variant="sub1">
                          Category: {posting.category}
                        </Typography>
                        <Typography variant="sub1">
                          Platform: {posting.platform}
                        </Typography>
                        <Typography variant="sub1">
                          Publisher: {posting.publisher}
                        </Typography>
                        <Typography variant="sub1">
                          Condition: {posting.condition}
                        </Typography>
                      </Grid>
                    );
                  } else if (posting.category === "Games") {
                    return (
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="sub1">
                          Post Date: {posting.createdAt}
                        </Typography>
                        <Typography variant="sub1">
                          Category: {posting.category}
                        </Typography>
                        <Typography variant="sub1">
                          Platform: {posting.platform}
                        </Typography>
                        <Typography variant="sub1">
                          Publisher: {posting.publisher}
                        </Typography>
                        <Typography variant="sub1">
                          Condition: {posting.condition}
                        </Typography>
                      </Grid>
                    );
                  } else if (posting.category === "Accessories") {
                    return (
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="sub1">
                          Post Date: {posting.createdAt}
                        </Typography>
                        <Typography variant="sub1">
                          Category: {posting.category}
                        </Typography>
                        <Typography variant="sub1">
                          Platform: {posting.platform}
                        </Typography>
                        <Typography variant="sub1">
                          Publisher: {posting.publisher}
                        </Typography>
                        <Typography variant="sub1">
                          Condition: {posting.condition}
                        </Typography>
                      </Grid>
                    );
                  } else if (posting.category === "Action Figures") {
                    return (
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="sub1">
                          Post Date: {posting.createdAt}
                        </Typography>
                        <Typography variant="sub1">
                          Category: {posting.category}
                        </Typography>
                        <Typography variant="sub1">
                          Figure Manufacture: {posting.figureManufacture}
                        </Typography>
                        <Typography variant="sub1">
                          Condition: {posting.condition}
                        </Typography>
                      </Grid>
                    );
                  } else if (posting.category === "Trading Card Game") {
                    return (
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="sub1">
                          Post Date: {posting.createdAt}
                        </Typography>
                        <Typography variant="sub1">
                          Category: {posting.category}
                        </Typography>
                        <Typography variant="sub1">
                          Card Game: {posting.cardGame}
                        </Typography>
                        <Typography variant="sub1">
                          Condition: {posting.condition}
                        </Typography>
                      </Grid>
                    );
                  } else if (posting.category === "Figurines") {
                    return (
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="sub1">
                          Post Date: {posting.createdAt}
                        </Typography>
                        <Typography variant="sub1">
                          Category: {posting.category}
                        </Typography>
                        <Typography variant="sub1">
                          Figurine Manufacture: {posting.figurineManufacture}
                        </Typography>
                        <Typography variant="sub1">
                          Condition: {posting.condition}
                        </Typography>
                      </Grid>
                    );
                  } else if (posting.category === "Board Game") {
                    return <Grid>i knew you were right</Grid>;
                  }
                })()}
              </Grid>

              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Button variant="outlined">Buy Now</Button>
                <Button variant="outlined">Add to Cart</Button>
                <Button variant="outlined">Add to Wish List</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item md={9}>
            <Grid
              sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}
            >
              <Tabs value={tabAID} onChange={handleTabAChange}>
                <Tab label="Description" />
                <Tab label="Product Detail" />
                <Tab label="Add. Info" />
              </Tabs>
            </Grid>
            <Grid item sx={{ mt: 1, mb: 1 }}>
              <Grid item>
                <TabPanelOne value={tabAID} index={0}>
                  <Typography variant="description">
                    Description: {posting.description}
                  </Typography>
                </TabPanelOne>
              </Grid>

              <TabPanelOne value={tabAID} index={1}>
                {(function () {
                  if (posting.category === "Console") {
                    return (
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="description">
                          Category: {posting.category}
                        </Typography>
                        <Typography variant="description">
                          Platform: {posting.platform}
                        </Typography>
                        <Typography variant="description">
                          Publisher: {posting.publisher}
                        </Typography>
                        <Typography variant="description">
                          Condition: {posting.condition}
                        </Typography>
                      </Grid>
                    );
                  } else if (posting.category === "Games") {
                    return (
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="description">
                          Category: {posting.category}
                        </Typography>
                        <Typography variant="description">
                          Platform: {posting.platform}
                        </Typography>
                        <Typography variant="description">
                          Genre: {posting.genre}
                        </Typography>
                        <Typography variant="description">
                          Publisher: {posting.publisher}
                        </Typography>
                        <Typography variant="description">
                          Condition: {posting.condition}
                        </Typography>
                      </Grid>
                    );
                  } else if (posting.category === "Accessories") {
                    return <Grid>Farewell</Grid>;
                  } else if (posting.category === "Action Figures") {
                    return (
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="description">
                          Category: {posting.category}
                        </Typography>
                        <Typography variant="description">
                          Manufacture: {posting.figureManufacture}
                        </Typography>
                        <Typography variant="description">
                          Condition: {posting.condition}
                        </Typography>
                      </Grid>
                    );
                  } else if (posting.category === "Trading Card Game") {
                    return (
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography>Category: {posting.category}</Typography>
                        <Typography>Card Game: {posting.cardGame}</Typography>
                        <Typography>Publisher: {posting.publisher}</Typography>
                        <Typography>Card Sale: {posting.cardSale}</Typography>
                        <Typography>Condition: {posting.condition}</Typography>
                      </Grid>
                    );
                  } else if (posting.category === "Figurines") {
                    return (
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="description">
                          Category: {posting.category}
                        </Typography>
                        <Typography variant="description">
                          Manufacture: {posting.figureManufacture}
                        </Typography>
                        <Typography variant="description">
                          Condition: {posting.condition}
                        </Typography>
                      </Grid>
                    );
                  } else if (posting.category === "Board Game") {
                    return <Grid>i knew you were right</Grid>;
                  }
                })()}
              </TabPanelOne>
              <TabPanelOne value={tabAID} index={2}>
                <Typography>goodbye</Typography>
              </TabPanelOne>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item md={9}>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}
            >
              <Tabs value={tabBID} onChange={handleTabBChange}>
                <Tab label="Related Products" />
                <Tab label="Related Games" />
                <Tab label="Similar Products" />
              </Tabs>
            </Grid>
            <Grid>
              <TabPanelTwo value={tabBID} index={0}>
                similar/related products
              </TabPanelTwo>
              <TabPanelTwo value={tabBID} index={1}>
                Games for particular system
              </TabPanelTwo>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
};

export default Posting;
