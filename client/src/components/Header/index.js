import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import ShopOutlinedIcon from "@mui/icons-material/ShopOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Box>
      <Paper
        square
        elevation={8}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#005493",
          pt: "10px",
          pb: "10px",
        }}
      >
        <Grid
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Grid>
            <SearchOutlinedIcon
              sx={{ fontSize: "30px", m: "20px" }}
              style={{ color: "white" }}
            />
          </Grid>
          <TextField
            sx={{ background: "white", borderRadius: "5px" }}
            size="small"
          />
        </Grid>
        <Grid
          item
          sx={{
            pl: "30px",
            pr: "30px",
            borderStyle: "solid",
            borderRadius: "60px",
            borderWidth: "thick",
            borderColor: "white",
          }}
        >
          <h1 style={{ color: "white", fontFamily: "Titillium Web" }}>
            Retro Rocket Shop
          </h1>
        </Grid>
        <Grid>
          <Link to="/">
            <ShopOutlinedIcon
              sx={{ fontSize: "30px", m: "20px" }}
              style={{ color: "white" }}
            />
          </Link>
          {Auth.loggedIn() ? (
            <>
              <Link to="/myprofile">
                <AccountCircleOutlinedIcon
                  sx={{ fontSize: "30px", m: "20px" }}
                  style={{ color: "white" }}
                />
              </Link>
              <Link onClick={logout}>
                <LogoutOutlinedIcon
                  sx={{ fontSize: "30px", m: "20px" }}
                  style={{ color: "white" }}
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup">
                <AssignmentIndOutlinedIcon
                  sx={{ fontSize: "30px", m: "20px" }}
                  style={{ color: "white" }}
                />
              </Link>
              <Link to="/login">
                <LoginOutlinedIcon
                  sx={{ fontSize: "30px", m: "20px" }}
                  style={{ color: "white" }}
                />
              </Link>
            </>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Header;
