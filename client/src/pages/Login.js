import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "20%",
          p: "10px",
          height: "650px",
          mt: "75px",
          mb: "75px",
        }}
      >
        <Grid item sx={{ mt: "50px", mb: "50px" }}>
          <h1 style={{ fontFamily: "Roboto Condensed" }}>Login</h1>
        </Grid>
        <Grid>
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  placeholder="Your email"
                  size="small"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  sx={{ width: "325px", mb: "20px" }}
                />
                <TextField
                  placeholder="******"
                  size="small"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  sx={{ width: "325px", mb: "50px" }}
                />
                <Button
                  variant="contained"
                  style={{ cursor: "pointer" }}
                  type="submit"
                  sx={{ width: "325px", mb: "150px" }}
                >
                  Submit
                </Button>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: "25px",
                  }}
                >
                  <h5>Not a Member?</h5>
                  <h5>
                    <Link to="/signup">Sign up here!!</Link>
                  </h5>
                </Grid>
              </Grid>
            </form>
          )}

          {error && (
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              {error.message}
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
