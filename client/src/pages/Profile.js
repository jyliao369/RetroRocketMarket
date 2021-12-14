import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card'; 

import Auth from '../utils/auth';

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

    const [ userpostings, setUserPostings ] = useState(postings);
    
    console.log('user postings');
    console.log(userpostings);

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

    useEffect(() => {
        setUserPostings(postings);
    }, [postings]);


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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} md={10} sx={{ display: 'flex', flexDirection: 'row', m: 1 }}>
                <Grid item md={8}>    
                    {postings.map((posting) => (
                        <Card key={posting._id} elevation={4} sx={{ m:2 }}>
                            <Grid item>
                                <p>title: { posting.title }</p>
                                <p>category: { posting.category }</p>
                                <p>platform: { posting.platform }</p>
                                <p>publisher: { posting.publisher }</p>
                                <p>genre: { posting.genre }</p>
                                <p>condition: { posting.condition }</p>
                                <p>descrip: { posting.description }</p>
                                <p>date: { posting.createdAt }</p>
                                <p>user: { posting.postAuthor }</p>
                            </Grid>
                            <Grid item sx={{ m:1 }}>
                                <button id={posting._id} onClick={handleDelete}>Delete</button>
                            </Grid>
                        </Card>
                    ))}
                </Grid>
                <Grid item md={4} sx={{ m:1 }}>
                    <GameForm/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;