import React, { useEffect } from "react";
import { useState } from "react";

import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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

import { Image, Transformation } from "cloudinary-react";

const Profile = () => {
  const { userId } = useParams();
  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : QUERY_MYPROFILE,
    {
      variables: { userId: userId },
    }
  );
  const user = data?.myprofile || data?.user || [];
  const allUserPostings = data?.myprofile.postings || data?.user || [];

  const [isLoading, setIsLoading] = useState(true);
  const [postings, setPostings] = useState([]);
  let [pageIndex, setPageIndex] = useState(0);
  let [min, setMin] = useState(0);
  let [max, setMax] = useState(6);

  useEffect(() => {
    setPostings(allUserPostings.slice(min, max));
    setIsLoading(false);
  }, [allUserPostings]);

  // THIS SHOWS ONLY 6 LISTINGS PER PAGE

  const ForBackListing = (direction) => {
    if (direction === "next") {
      min += 6;
      max += 5;
      pageIndex++;

      setPostings(allUserPostings.slice(min, max));
      setMin(min);
      setMax(max);
      setPageIndex(pageIndex);
    }
    if (direction === "previous") {
      min -= 6;
      max -= 5;
      pageIndex--;

      setPostings(allUserPostings.slice(min, max));
      setMin(min);
      setMax(max);
      setPageIndex(pageIndex);
    }
  };

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
      <Grid item sx={{ height: "100vh" }}>
        <Grid
          item
          sx={{ display: "flex", justifyContent: "center", pt: "115px" }}
        >
          <h2>
            You need to be logged in to see your profile page. Use the
            navigation links above to sign up or log in!
          </h2>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper elevation={8} sx={{ width: "70%", mt: "75px", mb: "75px" }}>
        <Grid
          item
          sx={{
            mb: "10px",
          }}
        >
          <Tabs value={profileTab} onChange={hanldeProfileTabChange}>
            <Tab label="Your Listings" />
            <Tab label="Create New Posting" />
            {/* <Tab label="Update Account" /> */}
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
                // justifyContent: "space-between",
                width: "70%",
                m: "15px",
                ml: "25px",
                mb: "14px",
                p: "15px",
                background: "rgb(134, 134, 134, 0.2)",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {pageIndex === 0 ? (
                  <Button variant="contained">Previous</Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => ForBackListing("previous")}
                  >
                    Previous
                  </Button>
                )}
                {pageIndex === Math.ceil(allUserPostings.length / 6) - 1 ? (
                  <Button variant="contained">Next</Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => ForBackListing("next")}
                  >
                    Next
                  </Button>
                )}
              </Grid>

              {allUserPostings.length === 0 ? (
                <Grid
                  item
                  sx={{ display: "flex", justifyContent: "center", pt: "30px" }}
                >
                  <h3>You have no postings...</h3>
                </Grid>
              ) : (
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  {postings.map((posting) => (
                    <Card
                      square
                      key={posting._id}
                      elevation={5}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        mt: "17px",
                        borderStyle: "solid",
                        borderColor: "rgb(64, 64, 64, .7)",
                      }}
                    >
                      <Link
                        to={`/shop/${posting._id}`}
                        style={{ textDecoration: "none" }}
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          <Grid
                            item
                            sx={{
                              borderRightStyle: "solid",
                              borderColor: "rgb(64, 64, 64, .7)",
                            }}
                          >
                            {(function () {
                              if (
                                posting.imageid === null ||
                                posting.imageid === "N/A"
                              ) {
                                return (
                                  <Image
                                    cloudName="du119g90a"
                                    public_id="noimagegame_uvzgky"
                                  >
                                    <Transformation
                                      width="200"
                                      height="150"
                                      crop="pad"
                                    />
                                  </Image>
                                );
                              } else {
                                return (
                                  <Image
                                    width="100%"
                                    height="100%"
                                    cloudName="du119g90a"
                                    public_id={posting.imageid}
                                  >
                                    <Transformation
                                      width="200"
                                      height="150"
                                      crop="pad"
                                    />
                                  </Image>
                                );
                              }
                            })()}
                          </Grid>

                          <Grid
                            item
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              p: "5px",
                            }}
                          >
                            <Grid>
                              <h2>{posting.title}</h2>
                              <h5>Date: {posting.createdAt}</h5>
                            </Grid>
                            <br />
                            {(function () {
                              if (posting.category === "Console") {
                                return (
                                  <Grid
                                    item
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Grid item sx={{ pr: "30px" }}>
                                      <p>Category: {posting.category}</p>
                                      <p>Platform: {posting.platform}</p>
                                      <p>Platform: {posting.publisher}</p>
                                    </Grid>
                                    <Grid>
                                      <p>Condition: {posting.condition}</p>
                                    </Grid>
                                  </Grid>
                                );
                              } else if (posting.category === "Games") {
                                return (
                                  <Grid
                                    item
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Grid item sx={{ pr: "30px" }}>
                                      <p>Category: {posting.category}</p>
                                      <p>Platform: {posting.platform}</p>
                                      <p>Publisher: {posting.publisher}</p>
                                    </Grid>
                                    <Grid>
                                      <p>Genre: {posting.genre}</p>
                                      <p>Condition: {posting.condition}</p>
                                    </Grid>
                                  </Grid>
                                );
                              } else if (posting.category === "Accessories") {
                                return (
                                  <Grid
                                    item
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Grid item sx={{ pr: "30px" }}>
                                      <p>Category: {posting.category}</p>
                                      <p>Platform: {posting.platform}</p>
                                      <p>Accessory: {posting.accessory}</p>
                                    </Grid>
                                    <Grid>
                                      <p>
                                        First/Third: {posting.accessoryCheck}
                                      </p>
                                      <p>Condition: {posting.condition}</p>
                                    </Grid>
                                  </Grid>
                                );
                              } else if (
                                posting.category === "Action Figures"
                              ) {
                                return (
                                  <Grid>
                                    <p>Category: {posting.category}</p>
                                    <p>Category: {posting.figureManufacture}</p>
                                    <p>Condition: {posting.condition}</p>
                                  </Grid>
                                );
                              } else if (
                                posting.category === "Trading Card Game"
                              ) {
                                return (
                                  <Grid
                                    item
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Grid item sx={{ pr: "30px" }}>
                                      <p>Category: {posting.category}</p>
                                      <p>Single/Booster: {posting.cardSale}</p>
                                      <p>Publisher: {posting.publisher}</p>
                                    </Grid>
                                    <Grid>
                                      <p>Condition: {posting.condition}</p>
                                    </Grid>
                                  </Grid>
                                );
                              } else if (posting.category === "Board Game") {
                                return (
                                  <Grid>
                                    <p>Category: {posting.category}</p>
                                    <p>Condition: {posting.condition}</p>
                                  </Grid>
                                );
                              } else if (posting.category === "Figurines") {
                                return (
                                  <Grid>
                                    <p>Category: {posting.category}</p>
                                    <p>
                                      Manufacture: {posting.figurineManufacture}
                                    </p>
                                    <p>Condition: {posting.condition}</p>
                                  </Grid>
                                );
                              }
                            })()}
                          </Grid>
                        </Grid>
                      </Link>
                    </Card>
                  ))}
                </Grid>
              )}
            </Grid>

            <Paper
              elevation={5}
              sx={{
                width: "30%",
                m: "15px",
                mr: "45px",
                mb: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "400px",
              }}
            >
              <Grid
                item
                sx={{
                  pt: "5px",
                  pb: "5px",
                  background: "#FFA4A4",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                  mb: "15px",
                }}
              >
                <h2>Statistics</h2>
              </Grid>
              <Grid item sx={{ mb: "10px" }}>
                <h2>Your Listings</h2>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: "15px",
                }}
              >
                <p>All Listings</p>
                <p>Currently Selling</p>
                <p>Sold Listings</p>
              </Grid>
              <Grid item sx={{ mb: "10px" }}>
                <h2>Category</h2>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: "15px",
                }}
              >
                <p>Acessories</p>
                <p>Consoles</p>
                <p>Games</p>
                <p>Action Figures</p>
                <p>Figurines</p>
                <p>Trading Cards</p>
              </Grid>
            </Paper>
          </Grid>
        </TabPanel>

        <TabPanel value={profileTab} index={1}>
          <Grid item sx={{ height: "1150px" }}>
            <PostForm />
          </Grid>
        </TabPanel>

        {/* <TabPanel value={profileTab} index={2}>
          Item Three
        </TabPanel> */}
      </Paper>
    </Box>
  );
};

export default Profile;
