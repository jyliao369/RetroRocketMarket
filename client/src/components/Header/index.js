import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
    <Box sx={{ height: "300px" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Grid>
            <SearchOutlinedIcon sx={{ fontSize: "30px", m: "20px" }} />
          </Grid>
          <TextField size="small" />
        </Grid>
        <Grid item sx={{ p: "15px" }}>
          <h1>PopMarket!! Retro Rocket!!</h1>
        </Grid>
        <Grid>
          <Link to="/shop">
            <ShopOutlinedIcon sx={{ fontSize: "30px", m: "20px" }} />
          </Link>
          {Auth.loggedIn() ? (
            <>
              <Link to="/myprofile">
                <AccountCircleOutlinedIcon
                  sx={{ fontSize: "30px", m: "20px" }}
                />
              </Link>
              <Link onClick={logout}>
                <LogoutOutlinedIcon sx={{ fontSize: "30px", m: "20px" }} />
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup">
                <AssignmentIndOutlinedIcon
                  sx={{ fontSize: "30px", m: "20px" }}
                />
              </Link>
              <Link to="/login">
                <LoginOutlinedIcon sx={{ fontSize: "30px", m: "20px" }} />
              </Link>
            </>
          )}
        </Grid>
      </Paper>

      {/* <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
        <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
          <Link className="text-dark" to="/">
            <h1 className="m-0" style={{ fontSize: "3rem" }}>
              PopMarket!!
            </h1>
          </Link>
          <p className="m-0" style={{ fontSize: "1.75rem", fontWeight: "700" }}>
            Sell and Share your love of Pop Culture!!
          </p>
          <div>
            <Link className="btn btn-lg btn-primary m-2" to="/shop">
              Shop
            </Link>
            {Auth.loggedIn() ? (
              <>
                <Link className="btn btn-lg btn-primary m-2" to="/myprofile">
                  View My Profile
                </Link>
                <button className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-lg btn-primary m-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-lg btn-light m-2" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </header> */}
    </Box>
  );
};

export default Header;
