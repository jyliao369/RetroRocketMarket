import React from "react";
// import { useEffect } from 'react';
import { useState } from "react";

import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// import PostingList from '../components/PostingList';
import PostForm from "../components/PostForm";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { QUERY_MYPROFILE } from "../utils/queries";
import { REMOVE_POSTING } from "../utils/mutations";

// Import Material UI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";

import Auth from "../utils/auth";

import { Image } from "cloudinary-react";

const Profile = () => {
  const { userId } = useParams();

  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : QUERY_MYPROFILE,
    {
      variables: { userId: userId },
    }
  );

  const user = data?.myprofile || data?.user || {};
  const postings = user.postings;

  console.log(postings);

  // THESE ARE FOR THE TABS
  const [profileTab, setProfileTab] = useState(0);

  const hanldeProfileTabChange = (event, newValue) => {
    setProfileTab(newValue);
  };

  function TabPanel(props) {
    const { children, value, index } = props;
    return <Box>{value === index && <div>{children}</div>}</Box>;
  }

  // THIS SHOULD BE ABLE DELETE POSTING THE USER MADE
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

  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Redirect to="/myprofile" />;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  if (postings === undefined || loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={8}
        sx={{ width: "70%", mb: "100px", position: "absolute", mt: "-80px" }}
      >
        <h1>How about that all that advice and she didnt even pay us a dime</h1>
        <Grid>
          <Tabs value={profileTab} onChange={hanldeProfileTabChange}>
            <Tab label="Your Listings" />
            <Tab label="Create New Posting" />
            <Tab label="Update Account" />
          </Tabs>
        </Grid>

        <TabPanel value={profileTab} index={0}>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "1150px",
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "70%",
                m: "15px",
              }}
            >
              {postings.map((posting) => (
                <Card
                  key={posting._id}
                  elevation={5}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <Link
                    to={`/shop/${posting._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Grid item sx={{ display: "flex" }}>
                      <Grid
                        item
                        sx={{
                          width: "200px",
                          height: "150px",
                        }}
                      >
                        {(function () {
                          if (
                            posting.imageid === null ||
                            posting.imageid === "N/A"
                          ) {
                            return (
                              <Grid>
                                <Image
                                  width="100%"
                                  cloudName="du119g90a"
                                  public_id="https://res.cloudinary.com/du119g90a/image/upload/v1639609335/noimagegame_uvzgky.jpg"
                                />
                              </Grid>
                            );
                          } else {
                            return (
                              <Grid>
                                <Image
                                  width="100%"
                                  cloudName="du119g90a"
                                  public_id={posting.imageid}
                                />
                              </Grid>
                            );
                          }
                        })()}
                      </Grid>
                      <Grid
                        item
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Grid>
                          <h1>{posting.title}</h1>
                          <h5>Date: {posting.createdAt}</h5>
                        </Grid>

                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          <Grid>
                            <p>Category: {posting.category}</p>
                            <p>Platform: {posting.platform}</p>
                            <p>Condition: {posting.condition}</p>
                          </Grid>
                          <Grid>
                            <p>Publisher: {posting.publisher}</p>
                            <p>Genre: {posting.genre}</p>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Link>
                  <Grid>
                    <Button id={posting._id} onClick={handleDelete}>
                      Delete
                    </Button>
                    <Button>
                      <Link to={`/update/${posting._id}`} /*id={posting._id}*/>
                        Update
                      </Link>
                    </Button>
                  </Grid>
                </Card>
              ))}
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button variant="contained">Previous</Button>
                <Button variant="contained">Next</Button>
              </Grid>
            </Grid>

            <Paper elevation={5} sx={{ width: "30%", m: "15px" }}>
              <Grid>
                <h3>Statistics</h3>
              </Grid>
            </Paper>
          </Grid>
        </TabPanel>

        <TabPanel value={profileTab} index={1}>
          <Grid item sx={{ height: "1150px" }}>
            <PostForm />
          </Grid>
        </TabPanel>

        <TabPanel value={profileTab} index={2}>
          Item Three
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Profile;
