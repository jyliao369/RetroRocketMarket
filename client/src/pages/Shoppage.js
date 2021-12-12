import React from 'react';

import { useQuery } from '@apollo/client';

import { QUERY_POSTINGS } from '../utils/queries';

const Userspage = () => {

    const { loading, data } = useQuery(QUERY_POSTINGS);
    const postings = data?.postings || [];

    console.log("postings " + postings);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cataloguelist">
            {postings.map((posting) => (
                <div key={posting._id} className="postingcard">
                    <p>{ posting.title }</p>
                    <p>{ posting.postAuthor }</p>
                    <p>{ posting.publisher }</p>
                    <p>{ posting.condition }</p>
                    <p>{ posting.createdAt }</p>
                    <p>{ posting.description }</p>
                </div>
            ))}
        </div>
    )

};

export default Userspage;