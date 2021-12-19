import React from 'react';

import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_POSTINGS } from '../utils/queries';

// Import Material UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { Image } from 'cloudinary-react';

const Shoppage = () => {

    const { loading, data } = useQuery(QUERY_POSTINGS);
    const postings = data?.postings || [];

    console.log("postings " + postings);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {postings.map((posting) => (
                    <Grid item key={posting._id} md={2.25} xs={6} sx={{ m: 1 }}>
                        <Link to={`/shop/${ posting._id }`}>
                            <Card elevation={4}>
                                <Grid item sx={{ p:1 }}>
                                    { posting.imageid ? (
                                        <Image
                                            width="100%"
                                            cloudName="du119g90a" 
                                            public_id={ posting.imageid }
                                        />
                                    ): (
                                        <Image 
                                            width="100%"
                                            cloudName="du119g90a" 
                                            public_id='https://res.cloudinary.com/du119g90a/image/upload/v1639609335/noimagegame_uvzgky.jpg'
                                        />
                                    )}
                                </Grid>
                                <Grid item sx={{ p:1 }}>
                                    <Typography variant='h6'>{ posting.title }</Typography>
                                    <br/>
                                    <Typography>Category: { posting.category }</Typography>
                                    <Typography>Platform: { posting.platform }</Typography>
                                    <Typography>Condition: { posting.condition }</Typography>

                                    {/* <p>{ posting.postAuthor }</p>
                                    <p>{ posting.publisher }</p>
                                    <p>{ posting.createdAt }</p>
                                    <p>{ posting.description }</p> */}
                                </Grid>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
};

export default Shoppage;