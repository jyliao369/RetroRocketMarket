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

import { Image } from "cloudinary-react";

import Masonry from "react-masonry-css";

import * as dataList from "../components/data";

import { MenuItem } from "@mui/material";

const Shoppage = () => {
  const { loading, data } = useQuery(QUERY_POSTINGS);
  const postings = data?.postings || [];

  console.log("postings");
  console.log(postings);

  const [disPostings, setPostings] = useState(postings);

  console.log("disPostings");
  console.log(disPostings);

  console.log("data");
  console.log(dataList.platform);

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

  const [VGFilter, setVGFilter] = useState(false);
  const handleVGFilterExpand = () => {
    setVGFilter(!VGFilter);
    setTCFilter(false);
    setAFFilter(false);
    setBGFilter(false);

    setadvTCFilter(false);
    setadvAFFilter(false);
  };
  const [TCFilter, setTCFilter] = useState(false);
  const handleTCFilterExpand = () => {
    setVGFilter(false);
    setTCFilter(!TCFilter);
    setAFFilter(false);
    setBGFilter(false);

    setadvVGFilter(false);
    setadvAFFilter(false);
  };
  const [AFFilter, setAFFilter] = useState(false);
  const handleAFFilterExpand = () => {
    setVGFilter(false);
    setTCFilter(false);
    setAFFilter(!AFFilter);
    setBGFilter(false);

    setadvVGFilter(false);
    setadvTCFilter(false);
  };
  const [BGFilter, setBGFilter] = useState(false);
  const handleBGFilterExpand = () => {
    setVGFilter(false);
    setTCFilter(false);
    setAFFilter(false);
    setBGFilter(!BGFilter);

    setadvVGFilter(false);
    setadvTCFilter(false);
  };

  const [advVGFilter, setadvVGFilter] = useState(false);
  const handleadvVGFilterExpand = () => {
    setadvVGFilter(!advVGFilter);
  };

  const [advTCFilter, setadvTCFilter] = useState(false);
  const handleadvTCFilterExpand = () => {
    setadvTCFilter(!advTCFilter);
  };

  const [advAFFilter, setadvAFFilter] = useState(false);
  const handleadvAFFilterExpand = () => {
    setadvAFFilter(!advAFFilter);
  };

  const handleFilter = async (event) => {
    let fitleredPost = [];
    let key = await event.target.value;
    console.log(key);
    fitleredPost = postings.filter(
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
    setPostings(fitleredPost);
  };

  const showAll = async (event) => {
    setPostings(postings);
  };

  const breakpoints = {
    default: 4,
    700: 1,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Grid item sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" onClick={showAll}>
          Show All
        </Button>
        <Button variant="outlined" onClick={handleVGFilterExpand}>
          Video Game
        </Button>
        <Button variant="outlined" onClick={handleTCFilterExpand}>
          Trading Cards
        </Button>
        <Button variant="outlined" onClick={handleAFFilterExpand}>
          Action Figure
        </Button>
      </Grid>
      <Collapse in={VGFilter}>
        <Grid item sx={{ display: "flex", justifyContent: "center", m: 1 }}>
          <Button variant="outlined" value="Games" onClick={handleFilter}>
            Games
          </Button>
          <Button variant="outlined" value="Console" onClick={handleFilter}>
            Consoles
          </Button>
          <Button variant="outlined" value="Accessories" onClick={handleFilter}>
            Accessories
          </Button>
          <Button variant="outlined" onClick={handleadvVGFilterExpand}>
            More Options
          </Button>
        </Grid>
        <Collapse in={advVGFilter}>
          <Grid item sx={{ display: "flex", justifyContent: "center", m: 1 }}>
            <TextField
              select
              helperText="Select a Platform"
              onChange={handleFilter}
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
        <Grid item sx={{ display: "flex", justifyContent: "center", m: 1 }}>
          <Button variant="outlined" value="Pokemon Trading Card Game">
            Pokemon
          </Button>
          <Button
            variant="outlined"
            value="Yu-Gi-Oh! Trading Card Game"
            onClick={handleFilter}
          >
            Yu-Gi-Oh!
          </Button>
          <Button variant="outlined" onClick={handleadvTCFilterExpand}>
            More Options
          </Button>
        </Grid>
        <Collapse in={advTCFilter}>
          <Grid item sx={{ display: "flex", justifyContent: "center", m: 1 }}>
            <TextField select helperText="Select a Card Game">
              {dataList.cardGames.map((game) => (
                <MenuItem key={game} value={game} onChange={handleFilter}>
                  {game}
                </MenuItem>
              ))}
            </TextField>
            <TextField select helperText="Single or Boxed">
              {dataList.cardSale.map((sale) => (
                <MenuItem key={sale} value={sale} onChange={handleFilter}>
                  {sale}
                </MenuItem>
              ))}
            </TextField>
            <TextField select helperText="Card Publisher">
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
        <Grid item sx={{ display: "flex", justifyContent: "center", m: 1 }}>
          <Button
            variant="outlined"
            value="Good Smile Company"
            onClick={handleFilter}
          >
            Good Smile Company
          </Button>
          <Button variant="outlined" value="BanPresto" onClick={handleFilter}>
            BanPresto
          </Button>
          <Button variant="outlined" value="Mattel" onClick={handleFilter}>
            Mattel
          </Button>
          <Button variant="outlined" onClick={handleadvAFFilterExpand}>
            More Options
          </Button>
        </Grid>
        <Collapse in={advAFFilter}>
          <Grid item sx={{ display: "flex", justifyContent: "center", m: 1 }}>
            <TextField select helperText="Select a Action Figure Brand">
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
            <TextField select helperText="Select a Figurine Brand">
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "#F1F2EE",
        }}
      >
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Masonry
            breakpointCols={breakpoints}
            sx={{ display: "flex", width: "auto" }}
          >
            {disPostings.map((posting) => (
              <Grid /*item key={posting._id} md={2.25} xs={6}*/ sx={{ m: 1.5 }}>
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
                  <Grid item sx={{ p: 1 }}>
                    <Typography variant="h6">{posting.title}</Typography>
                    <br />
                    {(function () {
                      if (posting.category === "Console") {
                        return (
                          <Grid>
                            <Typography>
                              Category: {posting.category}
                            </Typography>
                            <Typography>
                              Platform: {posting.platform}
                            </Typography>
                            <Typography>
                              Condition: {posting.condition}
                            </Typography>
                          </Grid>
                        );
                      } else if (posting.category === "Games") {
                        return (
                          <Grid>
                            <Typography>
                              Category: {posting.category}
                            </Typography>
                            <Typography>
                              Platform: {posting.platform}
                            </Typography>
                            <Typography>Genre: {posting.genre}</Typography>
                            <Typography>
                              Condition: {posting.condition}
                            </Typography>
                          </Grid>
                        );
                      } else if (posting.category === "Accessories") {
                        return (
                          <Grid>
                            <Typography>
                              Category: {posting.category}
                            </Typography>
                            <Typography>
                              Platform: {posting.platform}
                            </Typography>
                            <Typography>
                              Condition: {posting.condition}
                            </Typography>
                          </Grid>
                        );
                      } else if (posting.category === "Trading Card Game") {
                        return (
                          <Grid>
                            <Typography>
                              Category: {posting.category}
                            </Typography>
                            <Typography>
                              Card Game: {posting.cardGame}
                            </Typography>
                            <Typography>
                              Card Sale: {posting.cardSale}
                            </Typography>
                            <Typography>
                              Publisher: {posting.publisher}
                            </Typography>
                            <Typography>
                              Condition: {posting.condition}
                            </Typography>
                          </Grid>
                        );
                      } else if (posting.category === "Action Figures") {
                        return (
                          <Grid>
                            <Typography>
                              Category: {posting.category}
                            </Typography>
                            <Typography>
                              Brand: {posting.figureManufacture}
                            </Typography>
                            <Typography>
                              Condition: {posting.condition}
                            </Typography>
                          </Grid>
                        );
                      } else if (posting.category === "Figurines") {
                        return (
                          <Grid>
                            <Typography>
                              Category: {posting.category}
                            </Typography>
                            <Typography>
                              Brand: {posting.figurineManufacture}
                            </Typography>
                            <Typography>
                              Condition: {posting.condition}
                            </Typography>
                          </Grid>
                        );
                      }
                    })()}
                  </Grid>

                  <Grid>
                    <button id={posting._id} onClick={handleDelete}>
                      Delete
                    </button>
                    <button>
                      <Link to={`/update/${posting._id}`}>Update</Link>
                    </button>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Masonry>
        </Grid>
      </Box>
    </Box>
  );
};

export default Shoppage;
