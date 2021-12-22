import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { UPDATE_POSTING } from "../../utils/mutations";

// Import Material UI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const UpdateForm = (props) => {
  let category = [
    "Console",
    "Games",
    "Accessories",
    "Action Figures",
    "Trading Card Game",
    "Board Game",
    "Figurines",
    "undefined",
  ];
  let condition = ["New", "Used", "Complete", "Loose", "Broken", "undefined"];
  // THIS IS FOR GAMES AND CONSOLES
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
  // THESE ARE FOR ACCESSORIES
  let accessories = [
    "Game Controller",
    "Memory Cards",
    "Audio/Video Cable",
    "Console Cases",
    "CD Cases",
    "Cartridge Cases",
    "Add-Ons/Peripherals",
  ];
  let officialCheck = ["First Party", "Third Party", "Custom"];
  // THESE ARE FOR TRADING CARD GAMES
  let cardGames = [
    "Magic: The Gathering",
    "Pokemong Trading Card Game",
    "Yu-Gi-Oh! Trading Card Gane",
    "Dungeons and Dragons Icons of the Realms",
    "Cardfight!! Vanguard",
    "Dragon Ball Super",
    "Final Fantasy Trading Card Game",
    "Weiss Schwarz",
    "Transformers TCG",
    "Star Wars Destiny",
    "Ashes: Rise of the Phoenixborn",
    "Game of Thrones: The Card Game",
  ];
  let cardSale = [
    "Single Card",
    "Single Booster Pack",
    "Boxed Booster Pack",
    "Boxed Set",
    "Custom Collection",
  ];
  let cardPublisher = [
    "Wizards of the Coast",
    "Pokemong USA",
    "Konami",
    "Score Entertainment",
    "Mattel",
    "Bushiroad",
    "Bandai Namco",
    "Square Enix",
    "Hasbro",
    "Fantasy Flight Games",
    "Plaid Hat Games",
  ];
  // THESE ARE COMMON ACTION FIGURE MAKERS
  let AFMakers = [
    "Hasbro",
    "Mattel",
    "Bandai Spirits",
    "McFarlane Toys",
    "NECA",
    "Hot Toys",
    "DC Multiverse",
    "Diamond Select Toys",
    "Hot Toys",
    "Play Arts Kai",
  ];
  // THESE ARE COMMON FIGURINE MAKERS MOSTLY ARE GEARED TOWARD ANIME
  let figurineMaker = [
    "Good Smile Company",
    "Megahouse",
    "Kotobukiya",
    "Max Factory",
    "Alter",
    "BanPresto",
    "Orange Rouge",
    "Stronger",
    "Aniplex",
    "Bandai Namco Arts",
  ];

  // console.log("props.posting");
  // console.log(props.posting);

  const [updatedPosting, setUpdatePosting] = useState({
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

  useEffect(() => {
    setUpdatePosting({ ...props.posting });
  }, [props.posting]);

  // const [updatedPosting, setUpdatePosting] = useState({
  //   postingId: props.posting._id,
  //   title: props.posting.title,
  //   category: props.posting.category,
  //   platform: props.posting.platform,
  //   publisher: props.posting.publisher,
  //   genre: props.posting.genre,
  //   condition: props.posting.condition,
  //   accessory: props.posting.accessory,
  //   accessoryCheck: props.posting.accessoryCheck,
  //   cardGame: props.posting.cardGame,
  //   cardSale: props.posting.cardSale,
  //   figurineManufacture: props.posting.figurineManufacture,
  //   figureManufacture: props.posting.figureManufacture,
  //   description: props.posting.description,
  //   imageid: props.posting.imageid,
  // });

  const handleUpdate = (event) => {
    setUpdatePosting({
      ...updatedPosting,
      [event.target.name]: event.target.value,
    });
  };

  console.log("updatedposting");
  console.log(updatedPosting);

  const [updatePosting] = useMutation(UPDATE_POSTING);

  const confirmUpdate = async (event) => {
    let postingId = updatedPosting._id;

    try {
      updatePosting({
        variables: { postingId, ...updatedPosting },
      });
    } catch (e) {
      console.log(e);
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
                <h1>Update Posting</h1>
              </Grid>
              <TextField
                sx={{ m: 2 }}
                label="Title"
                name="title"
                placeholder="Title"
                onChange={handleUpdate}
                defaultValue={props.posting.title ?? " "}
              />
              <TextField
                select
                sx={{ m: 2 }}
                label="Condition"
                name="condition"
                placeholder="Condition"
                onChange={handleUpdate}
                defaultValue={props.posting.condition ?? " "}
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
                onChange={handleUpdate}
                defaultValue={props.posting.category ?? " "}
              >
                {category.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              {(function () {
                if (updatedPosting.category === "Console") {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        select
                        sx={{ m: 2 }}
                        label="Platform"
                        name="platform"
                        placeholder="Platform"
                        onChange={handleUpdate}
                        defaultValue={props.posting.platform ?? " "}
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
                        onChange={handleUpdate}
                        defaultValue={props.posting.publisher ?? " "}
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
                if (updatedPosting.category === "Games") {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        select
                        sx={{ m: 2 }}
                        label="Platform"
                        name="platform"
                        placeholder="Platform"
                        onChange={handleUpdate}
                        defaultValue={props.posting.platform ?? " "}
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
                        onChange={handleUpdate}
                        defaultValue={props.posting.publisher ?? " "}
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
                        onChange={handleUpdate}
                        defaultValue={props.posting.genre ?? " "}
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
                if (updatedPosting.category === "Accessories") {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        select
                        sx={{ m: 2 }}
                        label="Platform"
                        name="platform"
                        placeholder="Platform"
                        onChange={handleUpdate}
                        defaultValue={props.posting.platform ?? " "}
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
                        label="Accessories"
                        name="accessories"
                        placeholder="Accessories"
                        onChange={handleUpdate}
                        defaultValue={props.posting.accessories ?? " "}
                      >
                        {accessories.map((accessories) => (
                          <MenuItem key={accessories} value={accessories}>
                            {accessories}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        select
                        sx={{ m: 2 }}
                        label="First of Third Party"
                        name="accessoryCheck"
                        placeholder="Third/First Party"
                        onChange={handleUpdate}
                        defaultValue={props.posting.accessoryCheck ?? " "}
                      >
                        {officialCheck.map((officialCheck) => (
                          <MenuItem key={officialCheck} value={officialCheck}>
                            {officialCheck}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  );
                }
                if (updatedPosting.category === "Trading Card Game") {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        select
                        sx={{ m: 2 }}
                        label="Which Card Game?"
                        name="cardGame"
                        placeholder="Card Game"
                        onChange={handleUpdate}
                        defaultValue={props.posting.cardGame ?? " "}
                      >
                        {cardGames.map((cardGames) => (
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
                        onChange={handleUpdate}
                        defaultValue={props.posting.cardSale ?? " "}
                      >
                        {cardSale.map((cardSale) => (
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
                        onChange={handleUpdate}
                        defaultValue={props.posting.publisher ?? " "}
                      >
                        {cardPublisher.map((cardPublisher) => (
                          <MenuItem key={cardPublisher} value={cardPublisher}>
                            {cardPublisher}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  );
                }
                if (updatedPosting.category === "Action Figures") {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        select
                        sx={{ m: 2 }}
                        label="Manufacture"
                        name="figureManufacture"
                        placeholder="Action Figure Manufacture"
                        onChange={handleUpdate}
                        defaultValue={props.posting.figureManufacture ?? " "}
                      >
                        {AFMakers.map((AFMakers) => (
                          <MenuItem key={AFMakers} value={AFMakers}>
                            {AFMakers}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  );
                }
                if (updatedPosting.category === "Figurines") {
                  return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        select
                        sx={{ m: 2 }}
                        label="Manufacture"
                        name="figurineManufacture"
                        placeholder="Figurine Manufacture"
                        onChange={handleUpdate}
                        defaultValue={props.posting.figurineManufacture ?? " "}
                      >
                        {AFMakers.map((figurineMaker) => (
                          <MenuItem key={figurineMaker} value={figurineMaker}>
                            {figurineMaker}
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
                onChange={handleUpdate}
                defaultValue={props.posting.description ?? " "}
              />
            </Grid>
          </Grid>
          <Grid item sx={{ display: "flex", flexDirection: "column", m: 1 }}>
            <button onClick={confirmUpdate}>Update</button>
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
};

export default UpdateForm;
