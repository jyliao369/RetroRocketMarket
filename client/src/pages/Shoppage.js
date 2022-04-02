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
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Image } from "cloudinary-react";

import * as dataList from "../components/data";

const Shoppage = () => {
  const { loading, data } = useQuery(QUERY_POSTINGS);
  const postings = data?.postings || [];

  let allPostings = postings;

  const [disPostings, setPostings] = useState(allPostings);

  useEffect(() => {
    setPostings(disPostings);
  }, [postings]);

  const [removePosting] = useMutation(REMOVE_POSTING);

  const handleDelete = async (event) => {
    let postingId = event.target.id;
    console.log(postingId);

    try {
      await removePosting({
        variables: { postingId },
      });
      console.log("Posting succesfully deleted");
    } catch (e) {
      console.error(e);
      console.log(`It didn't work`);
    }
  };

  const handleFilter = async (key) => {
    let fitleredPost = postings.filter(
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
    console.log(fitleredPost);
    // setPostings(fitleredPost);
  };

  const showAll = async (event) => {
    setPostings(postings);
  };

  const breakpoints = {
    default: 4,
    700: 1,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Grid item sx={{ display: "flex", justifyContent: "center" }}>
        <Paper sx={{ display: "flex", width: "80%" }}>
          <Grid
            item
            sx={{
              width: "25%",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "gray",
            }}
          >
            <Grid sx={{ p: "10px" }}>
              <Grid onClick={() => showFilters("category")}>
                <h2>Category</h2>
              </Grid>
              <Collapse in={categoryFilter}>
                <Grid sx={{ mt: "10px" }}>
                  {dataList.category.map((category) => (
                    <div key={category} onClick={() => handleFilter(category)}>
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
                    <div key={platform} onClick={() => handleFilter(platform)}>
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
                    <p>{games}</p>
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
                    <p>{maker}</p>
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
                    <p>{maker}</p>
                  ))}
                </Grid>
              </Collapse>
            </Grid>
            <hr />
          </Grid>

          <Grid
            item
            sx={{
              width: "75%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "gray",
            }}
          >
            {allPostings.map((posting) => (
              <Grid
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
                  <h4>{posting.title}</h4>
                  <h4>Price: </h4>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* <Grid item sx={{ background: "#EDE6F1" }}>
        <Grid
          item
          sx={{ display: "flex", justifyContent: "center", pt: 1.5, pb: 1.5 }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={showAll}
            sx={{ mr: 1, ml: 1 }}
          >
            Show All
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleVGFilterExpand}
            sx={{ mr: 1, ml: 1 }}
          >
            Video Game/Consoles
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleTCFilterExpand}
            sx={{ mr: 1, ml: 1 }}
          >
            Trading Cards
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleAFFilterExpand}
            sx={{ mr: 1, ml: 1 }}
          >
            Action Figure
          </Button>
        </Grid>
        <Collapse in={VGFilter}>
          <Grid
            item
            sx={{ display: "flex", justifyContent: "center", mb: 1.5 }}
          >
            <Button
              variant="contained"
              size="small"
              value="Games"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              Games
            </Button>
            <Button
              variant="contained"
              size="small"
              value="Console"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              Consoles
            </Button>
            <Button
              variant="contained"
              size="small"
              value="Accessories"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              Accessories
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleadvVGFilterExpand}
              sx={{ mr: 1, ml: 1 }}
            >
              More Options
            </Button>
          </Grid>
          <Collapse in={advVGFilter}>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 1.5,
                mt: 1.5,
              }}
            >
              <TextField
                select
                helperText="Select a Platform"
                onChange={handleFilter}
                sx={{ mr: 1, ml: 1 }}
              >
                {dataList.platform.map((platform) => (
                  <MenuItem key={platform} value={platform}>
                    {platform}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                helperText="Select a Genre"
                onChange={handleFilter}
                sx={{ mr: 1, ml: 1 }}
              >
                {dataList.genre.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                helperText="Select a Publisher"
                onChange={handleFilter}
                sx={{ mr: 1, ml: 1 }}
              >
                {dataList.publisher.map((publisher) => (
                  <MenuItem key={publisher} value={publisher}>
                    {publisher}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                helperText="Select an Accessory"
                onChange={handleFilter}
                sx={{ mr: 1, ml: 1 }}
              >
                {dataList.accessories.map((accessory) => (
                  <MenuItem key={accessory} value={accessory}>
                    {accessory}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Collapse>
        </Collapse>
        <Collapse in={TCFilter}>
          <Grid
            item
            sx={{ display: "flex", justifyContent: "center", mb: 1.5 }}
          >
            <Button
              variant="contained"
              size="small"
              value="Pokemon Trading Card Game"
              sx={{ mr: 1, ml: 1 }}
            >
              Pokemon
            </Button>
            <Button
              variant="contained"
              size="small"
              value="Yu-Gi-Oh! Trading Card Game"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              Yu-Gi-Oh!
            </Button>
            <Button
              variant="contained"
              size="small"
              value="Magic: The Gathering"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              Magic
            </Button>
            <Button
              variant="contained"
              size="small"
              value="Star Wars Destiny"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              Final Fantasy
            </Button>
            <Button
              variant="contained"
              size="small"
              value="Final Fantasy Trading Card Game"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              Star Wars
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleadvTCFilterExpand}
              sx={{ mr: 1, ml: 1 }}
            >
              More Options
            </Button>
          </Grid>
          <Collapse in={advTCFilter}>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 1.5,
                mt: 1.5,
              }}
            >
              <TextField
                select
                helperText="Select a Card Game"
                sx={{ mr: 1, ml: 1 }}
              >
                {dataList.cardGames.map((game) => (
                  <MenuItem key={game} value={game} onChange={handleFilter}>
                    {game}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                helperText="Single or Boxed"
                sx={{ mr: 1, ml: 1 }}
              >
                {dataList.cardSale.map((sale) => (
                  <MenuItem key={sale} value={sale} onChange={handleFilter}>
                    {sale}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                helperText="Card Publisher"
                sx={{ mr: 1, ml: 1 }}
              >
                {dataList.cardPublisher.map((publisher) => (
                  <MenuItem
                    key={publisher}
                    value={publisher}
                    onChange={handleFilter}
                  >
                    {publisher}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Collapse>
        </Collapse>
        <Collapse in={AFFilter}>
          <Grid
            item
            sx={{ display: "flex", justifyContent: "center", mb: 1.5 }}
          >
            <Button
              variant="contained"
              size="small"
              value="Good Smile Company"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              Good Smile Company
            </Button>
            <Button
              variant="contained"
              size="small"
              value="Orange Rouge"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              Orange Rouge
            </Button>
            <Button
              variant="contained"
              size="small"
              value="Bandai"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              Bandai
            </Button>
            <Button
              variant="contained"
              size="small"
              value="Hasbro"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              Hasbro
            </Button>
            <Button
              variant="contained"
              size="small"
              value="McFarlane Toys"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              McFarlane Toys
            </Button>
            <Button
              variant="contained"
              size="small"
              value="POP!"
              onClick={handleFilter}
              sx={{ mr: 1, ml: 1 }}
            >
              POP!
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleadvAFFilterExpand}
              sx={{ mr: 1, ml: 1 }}
            >
              More Options
            </Button>
          </Grid>
          <Collapse in={advAFFilter}>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 1.5,
                mt: 1.5,
              }}
            >
              <TextField
                select
                helperText="Select a Action Figure Brand"
                sx={{ mr: 1, ml: 1 }}
              >
                {dataList.AFMakers.map((publisher) => (
                  <MenuItem
                    key={publisher}
                    value={publisher}
                    onChange={handleFilter}
                  >
                    {publisher}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                helperText="Select a Figurine Brand"
                sx={{ mr: 1, ml: 1 }}
              >
                {dataList.figurineMaker.map((publisher) => (
                  <MenuItem
                    key={publisher}
                    value={publisher}
                    onChange={handleFilter}
                  >
                    {publisher}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Collapse>
        </Collapse>
      </Grid> */}

      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "#897394",
        }}
      >
        <Grid
          item
          md={9}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <Masonry
              breakpointCols={breakpoints}
              sx={{ display: "flex", width: "auto" }}
            >
              {disPostings.map((posting) => (
                <Grid sx={{ m: 1.5 }}>
                  <Card elevation={4}>
                    <Grid item sx={{ p: 1 }}>
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
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        pt: 1,
                        pb: 1,
                        pl: 2,
                        pr: 2,
                        height: 200,
                      }}
                    >
                      <ThemeProvider theme={theme}>
                        <Grid item>
                          <Typography variant="h1">{posting.title}</Typography>
                        </Grid>
                      </ThemeProvider>

                      {(function () {
                        if (posting.category === "Console") {
                          return (
                            <Grid
                              item
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography variant="info">
                                Category: {posting.category}
                              </Typography>
                              <Typography variant="info">
                                Platform: {posting.platform}
                              </Typography>
                              <Typography variant="info">
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
                              <Typography variant="info">
                                Category: {posting.category}
                              </Typography>
                              <Typography variant="info">
                                Platform: {posting.platform}
                              </Typography>
                              <Typography variant="info">
                                Genre: {posting.genre}
                              </Typography>
                              <Typography variant="info">
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
                              <Typography variant="info">
                                Category: {posting.category}
                              </Typography>
                              <Typography variant="info">
                                Platform: {posting.platform}
                              </Typography>
                              <Typography variant="info">
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
                              <Typography variant="info">
                                Category: {posting.category}
                              </Typography>
                              <Typography variant="info">
                                Card Game: {posting.cardGame}
                              </Typography>
                              <Typography variant="info">
                                Card Sale: {posting.cardSale}
                              </Typography>
                              <Typography variant="info">
                                Publisher: {posting.publisher}
                              </Typography>
                              <Typography variant="info">
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
                              <Typography variant="info">
                                Category: {posting.category}
                              </Typography>
                              <Typography variant="info">
                                Brand: {posting.figureManufacture}
                              </Typography>
                              <Typography variant="info">
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
                              <Typography variant="info">
                                Category: {posting.category}
                              </Typography>
                              <Typography variant="info">
                                Brand: {posting.figurineManufacture}
                              </Typography>
                              <Typography variant="info">
                                Condition: {posting.condition}
                              </Typography>
                            </Grid>
                          );
                        }
                      })()}
                    </Grid>

                    <Grid>
                      <Button id={posting._id} onClick={handleDelete}>
                        Delete
                      </Button>
                      <Button>
                        <Link to={`/update/${posting._id}`}>Update</Link>
                      </Button>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Masonry>
          </ThemeProvider>
        </Grid>
      </Box> */}
    </Box>
  );
};

export default Shoppage;
