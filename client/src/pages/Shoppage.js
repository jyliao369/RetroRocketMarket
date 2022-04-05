import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_POSTINGS } from "../utils/queries";
import { REMOVE_POSTING } from "../utils/mutations";

// Import Material UI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { createTheme } from "@mui/material/styles";

import { Image } from "cloudinary-react";

import * as dataList from "../components/data";

const Shoppage = () => {
  const { loading, data } = useQuery(QUERY_POSTINGS);
  const allPostings = data?.postings || [];

  const [isLoading, setIsLoading] = useState(true);
  const [currentPostings, setCurrentPostings] = useState(allPostings);
  const [postings, setPostings] = useState(allPostings);

  useEffect(() => {
    if (allPostings.length === 0) {
      setIsLoading(true);
    } else {
      let currentListings = [];
      for (let a = 0; a < 12; a++) {
        currentListings.push(allPostings[a]);
      }
      setPostings(currentListings);
      setIsLoading(false);
    }
  }, [allPostings]);

  // THIS SHOULD SHOW ONLY 15 POSTS AT A TIME
  // console.log("current postings");
  // console.log(postings);

  let currentListings = [];
  for (let a = 0; a < 12; a++) {
    currentListings.push(postings[a]);
  }

  let [pageIndex, setPageIndex] = useState(0);

  const ForBackListing = (direction) => {
    if (direction === "next") {
      currentListings = [];
      pageIndex++;
      for (let a = 12 * pageIndex; a < 12 * (pageIndex + 1); a++) {
        currentListings.push(allPostings[a]);
      }
      // setCurrentPostings(currentListings);
      console.log(pageIndex);
      setPageIndex(pageIndex);
      console.log(currentListings);
      setPostings(currentListings);
    }

    if (direction === "previous") {
      currentListings = [];
      pageIndex--;
      for (let a = 12 * pageIndex; a < 12 * (pageIndex + 1); a++) {
        currentListings.push(allPostings[a]);
      }
      // setCurrentPostings(currentListings);
      console.log(pageIndex);
      setPageIndex(pageIndex);
      console.log(currentListings);
      setPostings(currentListings);
    }
  };

  const [removePosting] = useMutation(REMOVE_POSTING);

  // const handleDelete = async (event) => {
  //   let postingId = event.target.id;
  //   console.log(postingId);

  //   try {
  //     await removePosting({
  //       variables: { postingId },
  //     });
  //     console.log("Posting succesfully deleted");
  //   } catch (e) {
  //     console.error(e);
  //     console.log(`It didn't work`);
  //   }
  // };

  const handleFilter = async (key) => {
    let filteredPost = allPostings.filter(
      (posting) =>
        posting.category === key ||
        posting.condition === key ||
        posting.platform === key ||
        posting.publisher === key ||
        posting.genre === key ||
        posting.accessories === key ||
        posting.officialCheck === key ||
        posting.cardGame === key ||
        posting.cardSale === key ||
        posting.cardPublisher === key ||
        posting.AFMakers === key ||
        posting.figureManufacture === key
    );
    console.log(filteredPost);
    setCurrentPostings(filteredPost);
    setPostings(filteredPost);
  };

  const showAll = () => {
    setPostings(allPostings);
  };

  // const breakpoints = {
  //   default: 4,
  //   700: 1,
  // };

  const theme = createTheme();

  theme.typography.h1 = {
    fontFamily: "Cabin",
    fontSize: "1.05em",
    height: "4rem",
    fontWeight: "bold",
  };

  theme.typography.info = {
    fontFamily: "Alata",
    fontSize: "1em",
    height: "1.5rem",
  };

  // NEW CODE
  const [categoryFilter, setCategoryFilter] = useState(true);
  const [platformFilter, setPlatformFilter] = useState(false);
  const [accessoryFilter, setAccessoryFilter] = useState(false);
  const [genreFilter, setGenreFilter] = useState(false);
  const [cardgameFilter, setCardgameFilter] = useState(false);
  const [AFFilter, setAFFilter] = useState(false);
  const [FMFIlter, setFMFilter] = useState(false);

  const showFilters = (key) => {
    if (key === "category") {
      setCategoryFilter(!categoryFilter);
    }
    if (key === "system") {
      setPlatformFilter(!platformFilter);
    }
    if (key === "accessories") {
      setAccessoryFilter(!accessoryFilter);
    }
    if (key === "genre") {
      setGenreFilter(!genreFilter);
    }
    if (key === "cardGame") {
      setCardgameFilter(!cardgameFilter);
    }
    if (key === "AF") {
      setAFFilter(!AFFilter);
    }
    if (key === "FM") {
      setFMFilter(!FMFIlter);
    }
  };

  return (
    <Box>
      {isLoading ? (
        <Grid>
          <h1>Loading...</h1>
        </Grid>
      ) : (
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            square
            elevation={5}
            sx={{ display: "flex", width: "70%", mt: "10px", mb: "20px" }}
          >
            <Grid
              item
              sx={{
                width: "25%",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: "10px",
                }}
              >
                <Grid>
                  <h2>Filter</h2>
                </Grid>
                <Grid onClick={showAll}>
                  <h2>Reset</h2>
                </Grid>
              </Grid>
              <Grid sx={{ p: "10px" }}>
                <Grid onClick={() => showFilters("category")}>
                  <h2>Category</h2>
                </Grid>
                <Collapse in={categoryFilter}>
                  <Grid sx={{ mt: "10px" }}>
                    {dataList.category.map((category) => (
                      <div
                        key={category}
                        onClick={() => handleFilter(category)}
                      >
                        <p>{category}</p>
                      </div>
                    ))}
                  </Grid>
                </Collapse>
              </Grid>
              <hr />
              <Grid sx={{ p: "10px" }}>
                <Grid>
                  <Grid item>
                    <h2>Price</h2>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: "10px",
                    }}
                  >
                    <TextField sx={{ width: "125px" }} size="small" />
                    <TextField sx={{ width: "125px" }} size="small" />
                  </Grid>
                </Grid>
              </Grid>
              <hr />
              <Grid sx={{ p: "10px" }}>
                <Grid onClick={() => showFilters("system")}>
                  <h2>System</h2>
                </Grid>
                <Collapse in={platformFilter}>
                  <Grid sx={{ mt: "10px" }}>
                    {dataList.platform.map((platform) => (
                      <div
                        key={platform}
                        onClick={() => handleFilter(platform)}
                      >
                        <p>{platform}</p>
                      </div>
                    ))}
                  </Grid>
                </Collapse>
              </Grid>
              <hr />
              <Grid sx={{ p: "10px" }}>
                <Grid onClick={() => showFilters("accessories")}>
                  <h2>Accessories</h2>
                </Grid>
                <Collapse in={accessoryFilter}>
                  <Grid sx={{ mt: "10px" }}>
                    {dataList.accessories.map((accessory) => (
                      <div
                        key={accessory}
                        onClick={() => handleFilter(accessory)}
                      >
                        <p>{accessory}</p>
                      </div>
                    ))}
                  </Grid>
                </Collapse>
              </Grid>
              <hr />
              <Grid sx={{ p: "10px" }}>
                <Grid onClick={() => showFilters("genre")}>
                  <h2>Genre</h2>
                </Grid>
                <Collapse in={genreFilter}>
                  <Grid sx={{ mt: "10px" }}>
                    {dataList.genre.map((genre) => (
                      <div key={genre} onClick={() => handleFilter(genre)}>
                        <p>{genre}</p>
                      </div>
                    ))}
                  </Grid>
                </Collapse>
              </Grid>
              <hr />
              <Grid sx={{ p: "10px" }}>
                <Grid onClick={() => showFilters("cardGame")}>
                  <h2>Card Games</h2>
                </Grid>
                <Collapse in={cardgameFilter}>
                  <Grid sx={{ mt: "10px" }}>
                    {dataList.cardGames.map((games) => (
                      <div key={games} onClick={() => handleFilter(games)}>
                        <p>{games}</p>
                      </div>
                    ))}
                  </Grid>
                </Collapse>
              </Grid>
              <hr />
              <Grid sx={{ p: "10px" }}>
                <Grid onClick={() => showFilters("AF")}>
                  <h2>Action Figure Maker</h2>
                </Grid>
                <Collapse in={AFFilter}>
                  <Grid sx={{ mt: "10px" }}>
                    {dataList.AFMakers.map((maker) => (
                      <div key={maker} onClick={() => handleFilter(maker)}>
                        <p>{maker}</p>
                      </div>
                    ))}
                  </Grid>
                </Collapse>
              </Grid>
              <hr />
              <Grid sx={{ p: "10px" }}>
                <Grid onClick={() => showFilters("FM")}>
                  <h2>Figurine Maker</h2>
                </Grid>
                <Collapse in={FMFIlter}>
                  <Grid sx={{ mt: "10px" }}>
                    {dataList.figurineMaker.map((maker) => (
                      <div key={maker} onClick={() => handleFilter(maker)}>
                        <p>{maker}</p>
                      </div>
                    ))}
                  </Grid>
                </Collapse>
              </Grid>
              <hr />
            </Grid>

            <Grid item sx={{ width: "75%" }}>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: "10px",
                }}
              >
                {pageIndex === 0 ? (
                  <Grid>
                    <h2>Done</h2>
                  </Grid>
                ) : (
                  <Grid onClick={() => ForBackListing("previous")}>
                    <h2>Previous</h2>
                  </Grid>
                )}
                {/* <Grid onClick={() => ForBackListing("previous")}>
                <h2>Previous</h2>
              </Grid> */}
                <Grid onClick={() => ForBackListing("next")}>
                  <h2>Next</h2>
                </Grid>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "gray",
                }}
              >
                {postings.map((posting) => (
                  <Grid
                    key={posting._id}
                    sx={{
                      width: "33.333333%",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "gray",
                    }}
                  >
                    <Grid item sx={{ p: "10px" }}>
                      <Link to={`/shop/${posting._id}`}>
                        {(function () {
                          if (
                            posting.imageid === null ||
                            posting.imageid === "N/A"
                          ) {
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
                      </Link>
                    </Grid>

                    <Grid item sx={{ p: "10px" }}>
                      <h3>{posting.title}</h3>
                      <h3>Price: </h3>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
    </Box>
  );
};

export default Shoppage;
