import React from 'react';
// import { useEffect } from 'react';
import { useState } from 'react';

import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// import PostingList from '../components/PostingList';
import GameForm from '../components/GameForm';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../utils/queries';
import { QUERY_MYPROFILE } from '../utils/queries';
import { REMOVE_POSTING } from '../utils/mutations';

// Import Material UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card'; 

import Auth from '../utils/auth';

import { Image } from 'cloudinary-react';

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

    // const [ userpostings, setUserPostings ] = useState(postings);
    
    // console.log('user postings');
    // console.log(userpostings);

    // THIS SHOULD BE ABLE DELETE POSTING THE USER MADE
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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} md={10} sx={{ display: 'flex', flexDirection: 'row', m: 1 }}>
                <Grid item md={8}>    
                    {postings.map((posting) => (
                        <Card key={posting._id} elevation={5} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', m:2 }}>
                            <Link to={`/shop/${ posting._id }`} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', m:2 }}>
                                <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Grid item xs={4} sx={{ display: 'flex', m: 1.50 }}>
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
                                    <Grid item sx={{ display: 'flex', flexDirection: 'column', m: 1.25, width: 725 }}>
                                        <Grid item>
                                            <h1>{ posting.title }</h1>
                                        </Grid>
                                        <br/>
                                        <Grid item sx={{ fontSize: 17 }}>
                                            <Grid item sx={{ display: 'flex', flexDirection: 'row', }}>
                                                <Grid item sx={{ mr: 15 }}> 
                                                    <p>Category: { posting.category }</p>
                                                    <p>Platform: { posting.platform }</p>
                                                    <p>Condition: { posting.condition }</p>
                                                </Grid>
                                                <Grid item>
                                                    <p>Publisher: { posting.publisher }</p>
                                                    <p>Genre: { posting.genre }</p>
                                                    <p>Date: { posting.createdAt }</p>
                                                </Grid>
                                            </Grid>
                                            <br/>
                                            <Grid>
                                                <p>Description: { posting.description }</p>
                                            </Grid>
                                        </Grid>
                                    </Grid>           
                                </Grid>  
                            </Link>
                            <Grid item sx={{ display: 'flex', flexDirection: 'column', m:1 }}>
                                <button id={posting._id} onClick={handleDelete}>Delete</button>
                                <button><Link to={`/update/${ posting._id }`} /*id={posting._id}*/>Update</Link></button>
                            </Grid>
                        </Card>
                    ))}
                </Grid>
                <Grid item md={4} sx={{ m: 1.75 }}>
                    <GameForm/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;