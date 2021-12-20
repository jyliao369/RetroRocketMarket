import React from 'react';

import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_POSTINGS } from '../utils/queries';
import { REMOVE_POSTING } from '../utils/mutations';

// Import Material UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { Image } from 'cloudinary-react';

import Masonry from 'react-masonry-css';

const Shoppage = () => {

    const { loading, data } = useQuery(QUERY_POSTINGS);
    const postings = data?.postings || [];

    console.log("postings " + postings);

    const [ removePosting ] = useMutation(REMOVE_POSTING);

    const handleDelete =  async (event) => {
        let postingId = event.target.id;
        console.log(postingId);

        try {
            await removePosting({
                variables: { postingId },
            });
            console.log('Posting succesfully deleted');
        } catch (e) {
            console.error(e);
            console.log(`It didn't work`);
        }
    };

    const breakpoints ={
        default: 5,
        700: 1,
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', background: '#F1F2EE' }}>
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Masonry
                    breakpointCols={breakpoints}
                    sx={{ display: 'flex', width: 'auto'}}
                >
                    {postings.map((posting) => (
                        <Grid /*item key={posting._id} md={2.25} xs={6}*/ sx={{ m: 1.5 }}>
                            <Card elevation={4}>
                                <Link to={`/shop/${ posting._id }`}>    
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
                                </Link>
                                {/* <Grid>
                                    <button id={posting._id} onClick={handleDelete}>Delete</button>
                                    <button><Link to={`/update/${ posting._id }`}>Update</Link></button>
                                </Grid> */}
                            </Card>
                        </Grid>
                    ))}    
                </Masonry>
            </Grid>
        </Box>
    )
};

export default Shoppage;