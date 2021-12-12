import React from 'react';

const PostingList = (postings) => {

    if (!postings.length) {
        return <h3>Sorry there are no postings!!</h3>;
    }

    console.log("hi");
    
    return (
        <div className='cataloguelist'>
            {/* {postings && postings.map((posting) => (
                <div key={posting._id} className="card">
                    <p>{posting.title}</p>
                    <p>{posting.postAuthor}</p>
                    <p>{posting.publisher}</p>
                    <p>{posting.condition}</p>
                    <p>{posting.description}</p>
                    <p>{posting.createdAt}</p>
                </div>    
            ))} */}
        </div>
    );
};

export default PostingList;