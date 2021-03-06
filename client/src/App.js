import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shoppage from "./pages/Shoppage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Posting from "./pages/Posting";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Box from "@mui/material/Box";
import Updatepage from "./pages/Updatepage";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />

        <Box item sx={{ background: "#E6EEF4" }}>
          <Route exact path="/">
            <Shoppage />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/myprofile">
            <Profile />
          </Route>

          <Route exact path="/shop/:postingId">
            <Posting />
          </Route>

          <Route exact path="/update/:postingId">
            <Updatepage />
          </Route>
        </Box>

        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
