import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_POSTINGS } from '../utils/queries';

// Import Material UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card'; 

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
                    <Grid item md={2.25} xs={6} sx={{ m: 1 }}>
                        <Card key={posting._id} elevation={4}>
                            <Grid>
                                <p>{ posting.title }</p>
                                <p>{ posting.postAuthor }</p>
                                <p>{ posting.publisher }</p>
                                <p>{ posting.condition }</p>
                                <p>{ posting.createdAt }</p>
                                <p>{ posting.description }</p>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
};

export default Shoppage;