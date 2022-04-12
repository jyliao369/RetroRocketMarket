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
import Slider from "@mui/material/Slider";
import { createTheme } from "@mui/material/styles";

import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

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
      setCurrentPostings(allPostings);
      let currentListings = [];
      for (let a = 0; a < 12; a++) {
        currentListings.push(allPostings[a]);
      }
      setPostings(currentListings);
      setIsLoading(false);
    }
  }, [allPostings]);

  console.log("page index" + Math.trunc(currentPostings.length / 12));

  // THIS SHOULD SHOW ONLY 15 POSTS AT A TIME
  let [pageIndex, setPageIndex] = useState(0);
  let currentListings = [];
  const ForBackListing = (direction) => {
    if (direction === "next") {
      currentListings = [];
      pageIndex++;
      for (let a = 12 * pageIndex; a < 12 * (pageIndex + 1); a++) {
        currentListings.push(currentPostings[a]);
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
        currentListings.push(currentPostings[a]);
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
    setPageIndex(0);
    setCurrentPostings(filteredPost);
    let currentListings = [];
    for (let a = 0; a < 12; a++) {
      if (filteredPost[a]) {
        currentListings.push(filteredPost[a]);
      } else {
        break;
      }
    }
    setPostings(currentListings);
  };

  const showAll = () => {
    setPageIndex(0);
    let currentListings = [];
    for (let a = 0; a < 12; a++) {
      currentListings.push(allPostings[a]);
    }
    setCurrentPostings(allPostings);
    setPostings(currentListings);
  };

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
    <Box item sx={{ position: "absolute", mt: "-80px" }}>
      {isLoading ? (
        <Grid>
          <h1>Loading...</h1>
        </Grid>
      ) : (
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            square
            elevation={18}
            sx={{
              display: "flex",
              width: "70%",
              mt: "10px",
              mb: "50px",
              height: "1331px",
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "25%",
                borderStyle: "solid",
                borderWidth: "thin",
                borderColor: "#C0C0C0",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: "10px",
                  borderBottom: "solid",
                  borderWidth: "thin",
                  borderColor: "#C0C0C0",
                }}
              >
                <Grid>
                  <h2>Filter</h2>
                </Grid>
                <Grid onClick={showAll}>
                  <CachedOutlinedIcon style={{ cursor: "pointer" }} />
                </Grid>
              </Grid>
              <Grid item sx={{ overflowY: "auto", height: "1000px" }}>
                <Grid sx={{ p: "10px" }}>
                  <Grid onClick={() => showFilters("category")}>
                    <h3 style={{ cursor: "pointer" }}>Category</h3>
                  </Grid>
                  <Collapse in={categoryFilter}>
                    <Grid sx={{ mt: "10px" }}>
                      {dataList.category.map((category) => (
                        <Grid
                          key={category}
                          onClick={() => handleFilter(category)}
                          sx={{ mb: "7px" }}
                        >
                          <p style={{ cursor: "pointer" }}>{category}</p>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </Grid>
                <hr />
                <Grid sx={{ p: "10px" }}>
                  <Grid>
                    <Grid item>
                      <h3>Price</h3>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "20px",
                        ml: "20px",
                        mr: "20px",
                      }}
                    >
                      <TextField sx={{ width: "125px" }} size="small" />
                      <TextField sx={{ width: "125px" }} size="small" />
                    </Grid>
                    <Grid item sx={{ mt: "20px", ml: "30px", mr: "30px" }}>
                      <Slider />
                    </Grid>
                  </Grid>
                </Grid>
                <hr />
                <Grid sx={{ p: "10px" }}>
                  <Grid onClick={() => showFilters("system")}>
                    <h3 style={{ cursor: "pointer" }}>System</h3>
                  </Grid>
                  <Collapse in={platformFilter}>
                    <Grid sx={{ mt: "10px" }}>
                      {dataList.platform.map((platform) => (
                        <Grid
                          key={platform}
                          onClick={() => handleFilter(platform)}
                          sx={{ mb: "7px" }}
                        >
                          <p style={{ cursor: "pointer" }}>{platform}</p>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </Grid>
                <hr />
                <Grid sx={{ p: "10px" }}>
                  <Grid onClick={() => showFilters("accessories")}>
                    <h3 style={{ cursor: "pointer" }}>Accessories</h3>
                  </Grid>
                  <Collapse in={accessoryFilter}>
                    <Grid sx={{ mt: "10px" }}>
                      {dataList.accessories.map((accessory) => (
                        <div
                          key={accessory}
                          onClick={() => handleFilter(accessory)}
                        >
                          <p style={{ cursor: "pointer" }}>{accessory}</p>
                        </div>
                      ))}
                    </Grid>
                  </Collapse>
                </Grid>
                <hr />
                <Grid sx={{ p: "10px" }}>
                  <Grid onClick={() => showFilters("genre")}>
                    <h3 style={{ cursor: "pointer" }}>Genre</h3>
                  </Grid>
                  <Collapse in={genreFilter}>
                    <Grid sx={{ mt: "10px" }}>
                      {dataList.genre.map((genre) => (
                        <Grid
                          key={genre}
                          onClick={() => handleFilter(genre)}
                          sx={{ mb: "7px" }}
                        >
                          <p style={{ cursor: "pointer" }}>{genre}</p>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </Grid>
                <hr />
                <Grid sx={{ p: "10px" }}>
                  <Grid onClick={() => showFilters("cardGame")}>
                    <h3 style={{ cursor: "pointer" }}>Card Games</h3>
                  </Grid>
                  <Collapse in={cardgameFilter}>
                    <Grid sx={{ mt: "10px" }}>
                      {dataList.cardGames.map((games) => (
                        <Grid
                          key={games}
                          onClick={() => handleFilter(games)}
                          sx={{ mb: "7px" }}
                        >
                          <p style={{ cursor: "pointer" }}>{games}</p>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </Grid>
                <hr />
                <Grid sx={{ p: "10px" }}>
                  <Grid onClick={() => showFilters("AF")}>
                    <h3 style={{ cursor: "pointer" }}>Action Figure Maker</h3>
                  </Grid>
                  <Collapse in={AFFilter}>
                    <Grid sx={{ mt: "10px" }}>
                      {dataList.AFMakers.map((maker) => (
                        <Grid
                          key={maker}
                          onClick={() => handleFilter(maker)}
                          sx={{ mb: "7px" }}
                        >
                          <p style={{ cursor: "pointer" }}>{maker}</p>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </Grid>
                <hr />
                <Grid sx={{ p: "10px" }}>
                  <Grid onClick={() => showFilters("FM")}>
                    <h3 style={{ cursor: "pointer" }}>Figurine Maker</h3>
                  </Grid>
                  <Collapse in={FMFIlter}>
                    <Grid sx={{ mt: "10px" }}>
                      {dataList.figurineMaker.map((maker) => (
                        <Grid
                          key={maker}
                          onClick={() => handleFilter(maker)}
                          sx={{ mb: "7px" }}
                        >
                          <p style={{ cursor: "pointer" }}>{maker}</p>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </Grid>
                <hr />
              </Grid>
            </Grid>

            <Grid item sx={{ width: "75%" }}>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: "10px",
                  borderStyle: "solid",
                  borderWidth: "thin",
                  borderColor: "#C0C0C0",
                }}
              >
                {pageIndex === 0 ? (
                  <Grid>
                    <ArrowBackIosNewOutlinedIcon
                      disabled
                      style={{ cursor: "pointer" }}
                    />
                  </Grid>
                ) : (
                  <Grid onClick={() => ForBackListing("previous")}>
                    <ArrowBackIosNewOutlinedIcon
                      style={{ cursor: "pointer" }}
                    />
                  </Grid>
                )}
                {pageIndex === Math.trunc(currentPostings.length / 12) - 1 ? (
                  <Grid>
                    <ArrowForwardIosOutlinedIcon
                      disabled
                      style={{ cursor: "pointer" }}
                    />
                  </Grid>
                ) : (
                  <Grid onClick={() => ForBackListing("next")}>
                    <ArrowForwardIosOutlinedIcon
                      style={{ cursor: "pointer" }}
                    />
                  </Grid>
                )}
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {postings.map((posting) => (
                  <Grid
                    key={posting._id}
                    sx={{
                      width: "33.33%",
                      borderStyle: "solid",
                      borderWidth: "thin",
                      borderColor: "#C0C0C0",
                    }}
                  >
                    <Grid
                      item
                      sx={{
                        p: "10px",
                      }}
                    >
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
                      <h5>{posting.title}</h5>
                      <br />
                      <h4>Price: </h4>
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
