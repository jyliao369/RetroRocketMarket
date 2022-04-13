import React from "react";
import { useState } from "react";
// import { Link } from 'react-router-dom';

import { useMutation } from "@apollo/client";
import { ADD_POSTING } from "../../utils/mutations";
import { QUERY_POSTINGS } from "../../utils/queries";
import { QUERY_MYPROFILE } from "../../utils/queries";

// Import Material UI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

// import Auth from '../../utils/auth';

import Axios from "axios";
// import { Image } from 'cloudinary-react';

import * as dataList from "../../components/data";

const PostForm = () => {
  const [newPosting, setNewPosting] = useState({
    title: "N/A",
    category: "N/A",
    platform: "N/A",
    publisher: "N/A",
    genre: "N/A",
    condition: "N/A",
    accessory: "N/A",
    accessoryCheck: "N/A",
    cardGame: "N/A",
    cardSale: "N/A",
    figurineManufacture: "N/A",
    figureManufacture: "N/A",
    description: "N/A",
    imageid: "N/A",
  });

  const handleChange = (event) => {
    setNewPosting({
      // ...newPosting,
      platform: "N/A",
      publisher: "N/A",
      genre: "N/A",
      accessory: "N/A",
      accessoryCheck: "N/A",
      cardGame: "N/A",
      cardSale: "N/A",
      figurineManufacture: "N/A",
      figureManufacture: "N/A",
      description: "N/A",
      imageid: "N/A",
    });
    setNewPosting({ ...newPosting, [event.target.name]: event.target.value });
  };

  console.log(newPosting);

  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yun8815z");

    Axios.post(
      "https://api.cloudinary.com/v1_1/du119g90a/image/upload",
      formData
    ).then((response) => {
      console.log("response");
      console.log(response);
      console.log("public ID");
      console.log(response.data.public_id);

      setNewPosting((prevState) => ({
        ...prevState,
        imageid: response.data.public_id,
      }));
    });
  };

  const [addPosting] = useMutation(ADD_POSTING, {
    update(cache, { data: { addPosting } }) {
      try {
        const { postings } = cache.readQuery({ query: QUERY_POSTINGS });

        cache.writeQuery({
          query: QUERY_POSTINGS,
          data: { postings: [addPosting, ...postings] },
        });
      } catch (e) {
        console.error(e);
      }

      const { myprofile } = cache.readQuery({ query: QUERY_MYPROFILE });
      cache.writeQuery({
        query: QUERY_MYPROFILE,
        data: {
          myprofile: {
            ...myprofile,
            postings: [...myprofile.postings, addPosting],
          },
        },
      });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPosting({
        variables: {
          ...newPosting,
          // postAuthor: Auth.getProfile.data.username,
        },
      });

      setNewPosting("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box item sx={{ display: "flex", flexDirection: "row" }}>
      <Paper
        elevation={5}
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: "15px",
          ml: "45px",
          maxHeight: "1024px",
        }}
      >
        <Grid item sx={{ mt: "25px", mb: "25px" }}>
          <h1>New Posting</h1>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField
            sx={{ m: 2 }}
            label="Title"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            size="large"
          />
          <TextField
            select
            sx={{ m: 2 }}
            label="Category"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            size="large"
          >
            {dataList.category.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          {(function () {
            if (newPosting.category === "Console") {
              return (
                <Box item sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    select
                    sx={{ m: 2 }}
                    label="Platform"
                    name="platform"
                    placeholder="Platform"
                    onChange={handleChange}
                    size="large"
                  >
                    {dataList.platform.map((platform) => (
                      <MenuItem key={platform} value={platform}>
                        {platform}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    sx={{ m: 2 }}
                    label="Publisher"
                    name="publisher"
                    placeholder="Publisher"
                    onChange={handleChange}
                    size="large"
                  >
                    {dataList.publisher.map((publisher) => (
                      <MenuItem key={publisher} value={publisher}>
                        {publisher}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              );
            }
            if (newPosting.category === "Games") {
              return (
                <Box item sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    select
                    sx={{ m: 2 }}
                    label="Platform"
                    name="platform"
                    placeholder="Platform"
                    onChange={handleChange}
                    size="large"
                  >
                    {dataList.platform.map((platform) => (
                      <MenuItem key={platform} value={platform}>
                        {platform}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    sx={{ m: 2 }}
                    label="Publisher"
                    name="publisher"
                    placeholder="Publisher"
                    onChange={handleChange}
                    size="large"
                  >
                    {dataList.publisher.map((publisher) => (
                      <MenuItem key={publisher} value={publisher}>
                        {publisher}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    sx={{ m: 2 }}
                    label="Genre"
                    name="genre"
                    placeholder="Genre"
                    onChange={handleChange}
                    size="large"
                  >
                    {dataList.genre.map((genre) => (
                      <MenuItem key={genre} value={genre}>
                        {genre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              );
            }
            if (newPosting.category === "Accessories") {
              return (
                <Box item sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    select
                    sx={{ m: 2 }}
                    label="Platform"
                    name="platform"
                    placeholder="Platform"
                    onChange={handleChange}
                    size="large"
                  >
                    {dataList.platform.map((platform) => (
                      <MenuItem key={platform} value={platform}>
                        {platform}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    sx={{ m: 2 }}
                    label="Accessory"
                    name="accessory"
                    placeholder="Accessory"
                    onChange={handleChange}
                    size="large"
                  >
                    {dataList.accessories.map((accessories) => (
                      <MenuItem key={accessories} value={accessories}>
                        {accessories}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    sx={{ m: 2 }}
                    label="First or Third Party"
                    name="accessoryCheck"
                    placeholder="Third/First Party"
                    onChange={handleChange}
                    size="large"
                  >
                    {dataList.officialCheck.map((officialCheck) => (
                      <MenuItem key={officialCheck} value={officialCheck}>
                        {officialCheck}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              );
            }
            if (newPosting.category === "Trading Card Game") {
              return (
                <Box item sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    select
                    sx={{ m: 2 }}
                    label="Which Card Game?"
                    name="cardGame"
                    placeholder="Card Game"
                    onChange={handleChange}
                    size="large"
                  >
                    {dataList.cardGames.map((cardGames) => (
                      <MenuItem key={cardGames} value={cardGames}>
                        {cardGames}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    sx={{ m: 2 }}
                    label="Single, Booster or Boxed"
                    name="cardSale"
                    placeholder="Card Sale"
                    onChange={handleChange}
                    size="large"
                  >
                    {dataList.cardSale.map((cardSale) => (
                      <MenuItem key={cardSale} value={cardSale}>
                        {cardSale}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    sx={{ m: 2 }}
                    label="Publisher"
                    name="publisher"
                    placeholder="Card Publisher"
                    onChange={handleChange}
                    size="large"
                  >
                    {dataList.cardPublisher.map((cardPublisher) => (
                      <MenuItem key={cardPublisher} value={cardPublisher}>
                        {cardPublisher}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              );
            }
            if (newPosting.category === "Action Figures") {
              return (
                <TextField
                  select
                  sx={{ m: 2 }}
                  label="Manufacture"
                  name="figureManufacture"
                  placeholder="Action Figure Manufacture"
                  onChange={handleChange}
                  size="large"
                >
                  {dataList.AFMakers.map((AFMakers) => (
                    <MenuItem key={AFMakers} value={AFMakers}>
                      {AFMakers}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }
            if (newPosting.category === "Figurines") {
              return (
                <TextField
                  select
                  sx={{ m: 2 }}
                  label="Manufacture"
                  name="figurineManufacture"
                  placeholder="Figurine Manufacture"
                  onChange={handleChange}
                  size="large"
                >
                  {dataList.figurineMaker.map((figurineMaker) => (
                    <MenuItem key={figurineMaker} value={figurineMaker}>
                      {figurineMaker}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }
          })()}
          <TextField
            select
            sx={{ m: 2 }}
            label="Condition"
            name="condition"
            placeholder="Condition"
            onChange={handleChange}
            size="large"
          >
            {dataList.condition.map((condition) => (
              <MenuItem key={condition} value={condition}>
                {condition}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            multiline
            sx={{ m: 2 }}
            rows={8}
            label="Description"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
        </Grid>

        <Grid item sx={{ mb: "25px", mt: "25px" }}>
          <input
            title=" "
            type="file"
            onChange={(event) => {
              uploadImage(event.target.files[0]);
              setImageSelected(event.target.files[0]);
            }}
          />
        </Grid>

        <Grid item sx={{ mb: "25px", mt: "25px" }}>
          <Button variant="contained" onClick={handleSubmit} type="submit">
            Add Post
          </Button>
        </Grid>
      </Paper>

      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "60%",
          m: "15px",
          mr: "40px",
          mb: "30px",
          height: "1110px",
        }}
      >
        <Grid item sx={{ mt: "30px", mb: "50px" }}>
          <h2>Listing Preview</h2>
        </Grid>

        <Grid item sx={{ mb: "25px" }}>
          {imageSelected ? (
            <Grid item sx={{ width: "250px", height: "250px" }}>
              <img
                src={URL.createObjectURL(imageSelected)}
                width="100%"
                alt="postingImage"
              ></img>
            </Grid>
          ) : (
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderStyle: "dotted",
                width: "250px",
                height: "250px",
              }}
            >
              <h1>No Image</h1>
            </Grid>
          )}
        </Grid>

        <Grid item sx={{ mb: "25px" }}>
          <h2>General Info</h2>
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            width: "90%",
            background: "rgb(128,128,128, 0.15)",
            p: "20px",
            borderRadius: "15px",
            mb: "30px",
          }}
        >
          <Grid item sx={{ mr: "120px" }}>
            {/* GENERAL INFO ALL POSTINGS SHOULD HAVE */}
            <h3>Title: {newPosting.title}</h3>
            <h3>Category: {newPosting.category}</h3>
            <h3>Condition: {newPosting.condition}</h3>
            <h3>Publisher: {newPosting.publisher}</h3>
          </Grid>

          <Grid>
            {/* CONSOLES AND GAMES */}
            <h3>Platform: {newPosting.platform}</h3>
            <h3>Genre: {newPosting.genre}</h3>
            {/* FOR ACCESSORIES */}
            <h3>Accessory: {newPosting.accessory}</h3>
            <h3>Accessory Check: {newPosting.accessoryCheck}</h3>
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            width: "90%",
            background: "rgb(128,128,128, 0.15)",
            p: "20px",
            borderRadius: "15px",
            mb: "30px",
          }}
        >
          <Grid item sx={{ mr: "120px" }}>
            {/* CARD GAMES */}
            <h3>Card Sale: {newPosting.cardSale}</h3>
            <h3>Card Game: {newPosting.cardGame}</h3>
          </Grid>
          <Grid>
            {/* ACTION FIGURES AND FIGURINES */}
            <h3>Figure Manufacture: {newPosting.figureManufacture}</h3>
            <h3>Figurine Manufacture: {newPosting.figurineManufacture}</h3>
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            width: "90%",
            background: "rgb(128,128,128, 0.15)",
            p: "20px",
            borderRadius: "15px",
            height: "225px",
          }}
        >
          <h3>Description: {newPosting.description}</h3>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PostForm;
