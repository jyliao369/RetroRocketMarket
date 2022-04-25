import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RssFeedIcon from "@mui/icons-material/RssFeed";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#9DB3CA",
      }}
    >
      <Grid item sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "175px",
            width: "75%",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
            style={{ fontFamily: "Roboto Condensed" }}
          >
            <Grid item sx={{ mr: "50px" }}>
              <h4>Shop by Category</h4>
              <br />
              <p>Console</p>
              <p>Games</p>
              <p>Accessories</p>
              <p>Action Figures</p>
            </Grid>
            <Grid>
              <h4>Shop by Category</h4>
              <br />
              <p>My Profile</p>
              <p>Sign Up</p>
              <p>Log In</p>
            </Grid>
          </Grid>

          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontFamily: "Roboto Condensed" }}>
                Interested? Want to know more?
              </h3>
              <h3 style={{ fontFamily: "Roboto Condensed" }}>
                Subscribe for our news letter and for any updates!!
              </h3>
            </Grid>

            <br />
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItem: "center",
              }}
            >
              <TextField
                size="small"
                placeholder="Your E-Mail..."
                sx={{
                  borderStyle: "solid",
                  background: "white",
                  borderRadius: "5px",
                  width: "290px",
                }}
              />
              <Button size="small" variant="contained" sx={{ ml: "10px" }}>
                Subscribe
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Paper
        elevation={12}
        square
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "#004376",
          pt: "50px",
          pb: "50px",
        }}
      >
        <Grid
          item
          sx={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid
            item
            sx={{
              p: "5px",
              pl: "30px",
              pr: "30px",
              borderStyle: "solid",
              borderRadius: "60px",
              borderWidth: "thick",
              borderColor: "white",
            }}
          >
            <h2 style={{ color: "white", fontFamily: "Titillium Web" }}>
              Retro Rocket Shop
            </h2>
          </Grid>
          <Grid
            item
            sx={{
              width: "400px",
              fontSize: "20px",
              color: "white",
              textAlign: "center",
            }}
          >
            © 2022 All Rights Reserved | Terms of Use | and Privacy Policy
          </Grid>
          <Grid>
            <Grid item sx={{ mb: "10px" }}>
              <h3
                style={{
                  fontFamily: "Roboto Condensed",
                  color: "white",
                }}
              >
                Follow Us On:
              </h3>
            </Grid>
            <Grid>
              <FacebookOutlinedIcon
                sx={{
                  fontSize: "25px",
                  p: "8px",
                  background: "#D9E5EF",
                  borderRadius: "25px",
                  ml: "5px",
                  mr: "5px",
                }}
              />
              <TwitterIcon
                sx={{
                  fontSize: "25px",
                  p: "8px",
                  background: "#D9E5EF",
                  borderRadius: "25px",
                  ml: "5px",
                  mr: "5px",
                }}
              />
              <LinkedInIcon
                sx={{
                  fontSize: "25px",
                  p: "8px",
                  background: "#D9E5EF",
                  borderRadius: "25px",
                  ml: "5px",
                  mr: "5px",
                }}
              />
              <YouTubeIcon
                sx={{
                  fontSize: "25px",
                  p: "8px",
                  background: "#D9E5EF",
                  borderRadius: "25px",
                  ml: "5px",
                  mr: "5px",
                }}
              />
              <RssFeedIcon
                sx={{
                  fontSize: "25px",
                  p: "8px",
                  background: "#D9E5EF",
                  borderRadius: "25px",
                  ml: "5px",
                  mr: "5px",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Footer;
