import React from 'react';

import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import PostingList from '../components/PostingList';
import GameForm from '../components/GameForm';

import { QUERY_SINGLE_USER, QUERY_MYPROFILE } from '../utils/queries';

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
    console.log(postings);

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
                        <div key={posting._id} className="post">
                            <p>{ posting.title }</p>
                            <p>{ posting.postAuthor }</p>
                            <p>{ posting.publisher }</p>
                            <p>{ posting.condition }</p>
                            <p>{ posting.createdAt }</p>
                            <p>{ posting.description }</p>
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