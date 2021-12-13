import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { Redirect, useParams } from 'react-router-dom';

// import PostingList from '../components/PostingList';
import GameForm from '../components/GameForm';

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../utils/queries';
import { QUERY_MYPROFILE } from '../utils/queries';

import { useMutation } from '@apollo/client';
import { REMOVE_POSTING } from '../utils/mutations';

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
          <h4>
            You need to be logged in to see your profile page. Use the navigation
            links above to sign up or log in!
          </h4>
        );
    }

    return (
        <div>
            <div className="userpage">
                {user.username}
                {user.email}
                <div className="userposts">
                    {postings.map((posting) => (
                        <div key={posting._id}>
                            <div className="post">
                                <p>title: { posting.title }</p>
                                <p>category: { posting.category }</p>
                                <p>platform: { posting.platform }</p>
                                <p>publisher: { posting.publisher }</p>
                                <p>genre: { posting.genre }</p>
                                <p>condition: { posting.condition }</p>
                                <p>descrip: { posting.description }</p>
                                <p>date: { posting.createdAt }</p>
                                <p>user: { posting.postAuthor }</p>
                            </div>
                            <div>
                                <button id={posting._id} onClick={handleDelete}>delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <GameForm />
                </div> 
            </div>
        </div>
    );
    

};

export default Profile;