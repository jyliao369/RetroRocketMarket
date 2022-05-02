import React, { useEffect } from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
// import { useMutation } from '@apollo/client';

import { QUERY_SINGLE_POSTING, QUERY_POSTINGS } from "../utils/queries";

import { Image, Transformation } from "cloudinary-react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

const Posting = () => {
  const { postingId } = useParams();

  const {
    data: post,
    loading: postLoading,
    error: postError,
  } = useQuery(QUERY_SINGLE_POSTING, {
    variables: { postingId: postingId },
  });
  const posting = post?.posting || [];

  const { loading, data } = useQuery(QUERY_POSTINGS);

  const [similarPosts, setSimilarPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [checkTheseOut, setCheckTheseOut] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // THIS SHOULD CHOOSE 8 RANDOM POSTS
  useEffect(() => {
    if (posting) {
      const checkTheseOut =
        data?.postings
          .filter((post) => post.publisher === posting.publisher)
          .splice(0, 8) || [];
      setCheckTheseOut(checkTheseOut);

      const similarPosts =
        data?.postings
          .filter((post) => post.category === posting.category)
          .splice(0, 8) || [];
      setSimilarPosts(similarPosts);

      if (
        posting.category === "Figurines" ||
        posting.category === "Action Figures"
      ) {
        const relatedPosts =
          data?.postings
            .filter(
              (post) =>
                post.category === "Figurines" ||
                post.category === "Action Figures"
            )
            .splice(0, 8) || [];
        setRelatedPosts(relatedPosts);
      } else if (
        posting.category === "Console" ||
        posting.category === "Games" ||
        posting.category === "Accessories"
      ) {
        const relatedPosts =
          data?.postings
            .filter(
              (post) =>
                post.category === "Console" ||
                post.category === "Games" ||
                post.category === "Accessories"
            )
            .splice(0, 8) || [];
        setRelatedPosts(relatedPosts);
      } else if (posting.category === "Board Game") {
        const relatedPosts =
          data?.postings
            .filter((post) => post.category === "Board Game")
            .splice(0, 8) || [];
        setRelatedPosts(relatedPosts);
      }

      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [posting, data]);

  // THIS IS FOR THE TABS SECTION AND FUNCTION
  const [tabAID, setTabAID] = useState(0);
  const [tabBID, setTabBID] = useState(0);
  const handleTabAChange = (event, newValue) => {
    setTabAID(newValue);
  };
  function TabPanelOne(props) {
    const { children, value, index } = props;
    return <Box>{value === index && <h1>{children}</h1>}</Box>;
  }
  const handleTabBChange = (event, newValue) => {
    setTabBID(newValue);
  };
  function TabPanelTwo(props) {
    const { children, value, index } = props;
    return <Box>{value === index && <h1>{children}</h1>}</Box>;
  }

  return (
    <Box>
      {isLoading ? (
        <h1>Grabbing Post</h1>
      ) : (
        <Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: "75px",
              pb: "75px",
            }}
          >
            <Grid
              item
              md={10}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Grid item sx={{ width: "500px" }}>
                {(function () {
                  if (posting.imageid === null || posting.imageid === "N/A") {
                    return (
                      <Image
                        width="100%"
                        cloudName="du119g90a"
                        public_id="https://res.cloudinary.com/du119g90a/image/upload/v1639609335/noimagegame_uvzgky.jpg"
                      />
                    );
                  } else {
                    return (
                      <Image
                        width="100%"
                        cloudName="du119g90a"
                        public_id={posting.imageid}
                      />
                    );
                  }
                })()}
              </Grid>

              <Grid
                item
                md={4.5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid item sx={{ mb: 3 }}>
                    <p>{posting.title}</p>
                  </Grid>

                  {(function () {
                    if (posting.category === "Console") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Post Date: {posting.createdAt}</p>
                          <p>Category: {posting.category}</p>
                          <p>Platform: {posting.platform}</p>
                          <p>Publisher: {posting.publisher}</p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    } else if (posting.category === "Games") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Post Date: {posting.createdAt}</p>
                          <p>Category: {posting.category}</p>
                          <p>Platform: {posting.platform}</p>
                          <p>Publisher: {posting.publisher}</p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    } else if (posting.category === "Accessories") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Post Date: {posting.createdAt}</p>
                          <p>Category: {posting.category}</p>
                          <p>Platform: {posting.platform}</p>
                          <p>Publisher: {posting.publisher}</p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    } else if (posting.category === "Action Figures") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Post Date: {posting.createdAt}</p>
                          <p>Category: {posting.category}</p>
                          <p>Figure Manufacture: {posting.figureManufacture}</p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    } else if (posting.category === "Trading Card Game") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p> Post Date: {posting.createdAt}</p>
                          <p>Category: {posting.category}</p>
                          <p>Card Game: {posting.cardGame}</p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    } else if (posting.category === "Figurines") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Post Date: {posting.createdAt}</p>
                          <p>Category: {posting.category}</p>
                          <p>
                            Figurine Manufacture: {posting.figurineManufacture}
                          </p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    } else if (posting.category === "Board Game") {
                      return <Grid>i knew you were right</Grid>;
                    }
                  })()}
                </Grid>

                <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                  <Button variant="outlined">Buy Now</Button>
                  <Button variant="outlined">Add to Cart</Button>
                  <Button variant="outlined">Add to Wish List</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item md={9}>
              <Grid
                sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}
              >
                <Tabs value={tabAID} onChange={handleTabAChange}>
                  <Tab label="Description" />
                  <Tab label="Product Detail" />
                  {/* <Tab label="Add. Info" /> */}
                </Tabs>
              </Grid>

              <Grid item sx={{ mt: "45px", mb: "45px", height: "175px" }}>
                <TabPanelOne value={tabAID} index={0}>
                  <p style={{ fontSize: "20px" }}>
                    Description: {posting.description}
                  </p>
                </TabPanelOne>

                <TabPanelOne value={tabAID} index={1}>
                  {(function () {
                    if (posting.category === "Console") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Category: {posting.category}</p>
                          <p>Platform: {posting.platform}</p>
                          <p>Publisher: {posting.publisher}</p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    } else if (posting.category === "Games") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Category: {posting.category}</p>
                          <p>Platform: {posting.platform}</p>
                          <p>Genre: {posting.genre}</p>
                          <p>Publisher: {posting.publisher}</p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    } else if (posting.category === "Accessories") {
                      return <Grid>Farewell</Grid>;
                    } else if (posting.category === "Action Figures") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Category: {posting.category}</p>
                          <p>Manufacture: {posting.figureManufacture}</p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    } else if (posting.category === "Trading Card Game") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Category: {posting.category}</p>
                          <p>Card Game: {posting.cardGame}</p>
                          <p>Publisher: {posting.publisher}</p>
                          <p>Card Sale: {posting.cardSale}</p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    } else if (posting.category === "Figurines") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Category: {posting.category}</p>
                          <p>Manufacture: {posting.figureManufacture}</p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    } else if (posting.category === "Board Game") {
                      return (
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Category: {posting.category}</p>
                          <p>Condition: {posting.condition}</p>
                        </Grid>
                      );
                    }
                  })()}
                </TabPanelOne>
                {/* <TabPanelOne value={tabAID} index={2}>
            </TabPanelOne> */}
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item md={9}>
              <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                <Tabs value={tabBID} onChange={handleTabBChange}>
                  <Tab label="Similar Posts" />
                  <Tab label="Related Posts" />
                  <Tab label="Check These Out" />
                </Tabs>
              </Grid>
              <Grid item sx={{ mb: "50px", mt: "25px" }}>
                <TabPanelTwo value={tabBID} index={0}>
                  {similarPosts.length === 0 ? (
                    <Grid>
                      <h1>Loading...</h1>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      {similarPosts.map((posting) => (
                        <Card
                          item
                          square
                          sx={{
                            borderStyle: "solid",
                            display: "flex",
                            flexDirection: "column",
                            fontSize: "20px",
                            width: "300px",
                            mb: "25px",
                          }}
                        >
                          {(function () {
                            if (
                              posting.imageid === null ||
                              posting.imageid === "N/A"
                            ) {
                              return (
                                <Grid item sx={{ p: "10px", height: "220px" }}>
                                  <Image
                                    width="100%"
                                    height="100%"
                                    cloudName="du119g90a"
                                    public_id="noimagegame_uvzgky"
                                  />
                                </Grid>
                              );
                            } else {
                              return (
                                <Grid
                                  item
                                  sx={{
                                    p: "10px",
                                    height: "220px",
                                  }}
                                >
                                  <Image
                                    width="100%"
                                    height="100%"
                                    cloudName="du119g90a"
                                    public_id={posting.imageid}
                                  >
                                    <Transformation crop="pad" />
                                  </Image>
                                </Grid>
                              );
                            }
                          })()}

                          <h5>{posting.title}</h5>
                          <h5>{posting.category}</h5>
                          <h5>{posting.platform}</h5>
                          <h5>{posting.condition}</h5>
                        </Card>
                      ))}
                    </Grid>
                  )}
                </TabPanelTwo>

                <TabPanelTwo value={tabBID} index={1}>
                  {relatedPosts.length === 0 ? (
                    <Grid>
                      <h1>Loading...</h1>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      {relatedPosts.map((posting) => (
                        <Card
                          item
                          square
                          sx={{
                            borderStyle: "solid",
                            display: "flex",
                            flexDirection: "column",
                            fontSize: "20px",
                            width: "300px",
                            mb: "25px",
                          }}
                        >
                          {(function () {
                            if (
                              posting.imageid === null ||
                              posting.imageid === "N/A"
                            ) {
                              return (
                                <Grid item sx={{ p: "10px", height: "220px" }}>
                                  <Image
                                    width="100%"
                                    height="100%"
                                    cloudName="du119g90a"
                                    public_id="noimagegame_uvzgky"
                                  />
                                </Grid>
                              );
                            } else {
                              return (
                                <Grid
                                  item
                                  sx={{
                                    p: "10px",
                                    height: "220px",
                                  }}
                                >
                                  <Image
                                    width="100%"
                                    height="100%"
                                    cloudName="du119g90a"
                                    public_id={posting.imageid}
                                  >
                                    <Transformation crop="pad" />
                                  </Image>
                                </Grid>
                              );
                            }
                          })()}
                          <h5>{posting.title}</h5>
                          <h5>{posting.category}</h5>
                          <h5>{posting.platform}</h5>
                          <h5>{posting.condition}</h5>
                        </Card>
                      ))}
                    </Grid>
                  )}
                </TabPanelTwo>

                <TabPanelTwo value={tabBID} index={2}>
                  {checkTheseOut.length === 0 ? (
                    <Grid>
                      <h1>Loading...</h1>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      {checkTheseOut.map((posting) => (
                        <Card
                          item
                          square
                          sx={{
                            borderStyle: "solid",
                            display: "flex",
                            flexDirection: "column",
                            fontSize: "20px",
                            width: "300px",
                            mb: "25px",
                          }}
                        >
                          {(function () {
                            if (
                              posting.imageid === null ||
                              posting.imageid === "N/A"
                            ) {
                              return (
                                <Grid item sx={{ p: "10px", height: "220px" }}>
                                  <Image
                                    width="100%"
                                    height="100%"
                                    cloudName="du119g90a"
                                    public_id="noimagegame_uvzgky"
                                  />
                                </Grid>
                              );
                            } else {
                              return (
                                <Grid
                                  item
                                  sx={{
                                    p: "10px",
                                    height: "220px",
                                  }}
                                >
                                  <Image
                                    width="100%"
                                    height="100%"
                                    cloudName="du119g90a"
                                    public_id={posting.imageid}
                                  >
                                    <Transformation crop="pad" />
                                  </Image>
                                </Grid>
                              );
                            }
                          })()}
                          <h5>{posting.title}</h5>
                          <h5>{posting.category}</h5>
                          <h5>{posting.platform}</h5>
                          <h5>{posting.condition}</h5>
                        </Card>
                      ))}
                    </Grid>
                  )}
                </TabPanelTwo>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Posting;
