import React from 'react';
import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { QUERY_SINGLE_POSTING } from '../utils/queries';

import { Image } from 'cloudinary-react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Posting = () => {
    const { postingId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_POSTING, {
        variables: { postingId: postingId },
    });
    const posting = data?.posting || {};

    console.log('posting');
    console.log(posting);
    
    // THIS IS FOR THE TABS SECTION AND FUNCTION
    const [ tabAID, setTabAID ] = useState(0);
    const [ tabBID, setTabBID ] = useState(0);

    const handleTabAChange = (event, newValue) => {
        setTabAID(newValue);
    }

    function TabPanelOne(props) {
        const { children, value, index } = props;
        return (
            <Box>
                {
                    value === index && (
                        <h1>{ children }</h1>
                    )
                }
            </Box>
        )
    }

    const handleTabBChange = (event, newValue) => {
        setTabBID(newValue);
    }

    function TabPanelTwo(props) {
        const { children, value, index } = props;
        return (
            <Box>
                {
                    value === index && (
                        <h1>{ children }</h1>
                    )
                }
            </Box>
        )
    }

    return (
        <Box>
            <Grid>
                <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Grid item md={9} sx={{ mt: 4, mb: 4 }}>
                        <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Grid item md={5} sx={{ mr: 18.75 }}>
                                { posting.imageid ? ( 
                                    <Image width='100%' cloudName="du119g90a" public_id={posting.imageid} />
                                ) : (
                                    <Image width='100%' cloudName="du119g90a" public_id="https://res.cloudinary.com/du119g90a/image/upload/v1639609335/noimagegame_uvzgky.jpg"/>
                                )}
                            </Grid>
                            <Grid>
                                <Grid item>
                                    <h1>{ posting.title }</h1>
                                    <br/>
                                    <br/>
                                    <p>Category: { posting.category }</p>
                                    <br/>
                                    <p>Platform: { posting.platform }</p>
                                    <br/>
                                    <p>Condition: { posting.condition }</p>
                                </Grid>
                                <Grid item>
                                    <button>Add to Cart</button>
                                    <button>Add to Wish List</button>
                                </Grid>
                            </Grid>                        
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Grid item md={10}>
                        <Tabs value={tabAID} onChange={handleTabAChange}>
                            <Tab label="Description"/>
                            <Tab label="Product Detail"/>
                            <Tab label="Add. Info"/>
                        </Tabs>
                    </Grid>
                    <Grid>
                        <TabPanelOne value={tabAID} index={0}>Description: { posting.description }</TabPanelOne>
                        <TabPanelOne value={tabAID} index={1}>nice too meet you</TabPanelOne>
                        <TabPanelOne value={tabAID} index={2}>goodbye</TabPanelOne>
                    </Grid>
                </Grid>

                <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Grid item md={10}>
                        <Tabs value={tabBID} onChange={handleTabBChange}>
                            <Tab label="Related Products"/>
                            <Tab label="Related Games"/>
                            <Tab label="Similar Products"/>
                        </Tabs>
                    </Grid>
                    <Grid>
                        <TabPanelTwo value={tabBID} index={0}>similar/related products</TabPanelTwo>
                        <TabPanelTwo value={tabBID} index={1}>Games for particular system</TabPanelTwo>
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

            </Grid>
            
        </Box>
    );
};

export default Posting;