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

// import Auth from '../../utils/auth';

import Axios from "axios";
// import { Image } from 'cloudinary-react';

const PostForm = () => {
  let category = [
    "Games",
    "Console",
    "Accessories",
    "Action Figures",
    "TCG",
    "Board Games",
    "Figurines",
    "undefined",
  ];
  let platform = [
    "NES",
    "SNES",
    "N64",
    "GameCube",
    "Wii",
    "Wii U",
    "Switch",
    "GameBoy/Color",
    "GameBoy Advance",
    "Nintendo DS",
    "Nintendo 3DS",
    "PS1",
    "PS2",
    "PS3",
    "PS4",
    "PS5",
    "PSP",
    "PSVita",
    "Xbox",
    "Xbox 360",
    "Xbox One",
    "Xbox Series",
    "Genesis",
    "Game Gear",
    "Sega CD",
    "32X",
    "Sega Saturn",
    "DreamCast",
    "undefined",
  ];
  let publisher = [
    "Nintendo",
    "Microsoft",
    "Sony",
    "Bandai Namco",
    "Ubisoft",
    "EA Games",
    "Square Enix",
    "Konami",
    "Sega",
    "Capcom",
    "undefined",
  ];
  let genre = [
    "Platform",
    "FPS",
    "Survival Horror",
    "Metroidvania",
    "Visual Novels",
    "Action RPG",
    "RougeLikes",
    "JRPG",
    "Simulation",
    "Fighting",
    "Party",
    "Turn-Based Strategy",
    "Real-Time Strategy",
    "Racing",
    "Sports",
    "Open World",
    "Simulation",
    "Horror",
    "undefined",
  ];
  let condition = [
    "New",
    "Complete",
    "Loose",
    "Broken",
    "Adventure",
    "undefined",
  ];

  const [newPosting, setNewPosting] = useState({
    title: "",
    category: "",
    platform: "",
    publisher: "",
    genre: "",
    condition: "",
    description: "",
    imageid: "",
  });

  const handleChange = (event) => {
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
    <Box>
      <Grid>
        <Paper elevation={5}>
          <Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Grid
                item
                sx={{ display: "flex", justifyContent: "center", m: 2.5 }}
              >
                <h1>New Posting</h1>
              </Grid>
              <TextField
                sx={{ m: 2 }}
                label="Title"
                name="title"
                placeholder="Title"
                onChange={handleChange}
              />
              <TextField
                select
                sx={{ m: 2 }}
                label="Condition"
                name="condition"
                placeholder="Condition"
                onChange={handleChange}
              >
                {condition.map((condition) => (
                  <MenuItem key={condition} value={condition}>
                    {condition}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                sx={{ m: 2 }}
                label="Category"
                name="category"
                placeholder="Category"
                onChange={handleChange}
              >
                {category.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              {(function () {
                if (newPosting.category === "Console") {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        select
                        sx={{ m: 2 }}
                        label="Platform"
                        name="platform"
                        placeholder="Platform"
                        onChange={handleChange}
                      >
                        {platform.map((platform) => (
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
                      >
                        {publisher.map((publisher) => (
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
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        select
                        sx={{ m: 2 }}
                        label="Platform"
                        name="platform"
                        placeholder="Platform"
                        onChange={handleChange}
                      >
                        {platform.map((platform) => (
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
                      >
                        {publisher.map((publisher) => (
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
                      >
                        {genre.map((genre) => (
                          <MenuItem key={genre} value={genre}>
                            {genre}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  );
                }
                if (newPosting.category === "TCG") {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        select
                        sx={{ m: 2 }}
                        label="Publisher"
                        name="publisher"
                        placeholder="Publisher"
                        onChange={handleChange}
                      >
                        {publisher.map((publisher) => (
                          <MenuItem key={publisher} value={publisher}>
                            {publisher}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  );
                }
                if (newPosting.category === "Accessories") {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        select
                        sx={{ m: 2 }}
                        label="Publisher"
                        name="publisher"
                        placeholder="Publisher"
                        onChange={handleChange}
                      >
                        {publisher.map((publisher) => (
                          <MenuItem key={publisher} value={publisher}>
                            {publisher}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  );
                }
              })()}
              <TextField
                sx={{ m: 2 }}
                multiline
                rows={5}
                label="Description"
                name="description"
                placeholder="Description"
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                m: 2,
              }}
            >
              <Grid item xs={10}>
                {imageSelected ? (
                  <img
                    src={URL.createObjectURL(imageSelected)}
                    width="100%"
                    alt=""
                  ></img>
                ) : (
                  <h1>No Image</h1>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <input
                  title=" "
                  type="file"
                  onChange={(event) => {
                    uploadImage(event.target.files[0]);
                    setImageSelected(event.target.files[0]);
                  }}
                />
              </Grid>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <button onClick={handleSubmit} type="submit">
                Add Post
              </button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
};

export default PostForm;
