import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POSTING } from '../../utils/mutations';
import { QUERY_POSTINGS, QUERY_MYPROFILE } from '../../utils/queries';

// import Auth from '../../utils/auth';

const GameForm = () => {

    const [ newPosting, setNewPosting] = useState({
        title: '',
        category: '',
        platform: '',
        publisher:'',
        genre: '',
        condition:'',
        description:'',
    });

    const handleChange = (event) => {
        setNewPosting({ ...newPosting, [event.target.name]: event.target.value})
    };

    console.log(newPosting);

    const [addPosting, {error}] = useMutation(ADD_POSTING, {
        update(cache, { data: { addPosting } }) {
            try {
                const { postings } = cache.readQuery({ query: QUERY_POSTINGS });

                cache.writeQuery({
                    query: QUERY_POSTINGS,
                    data: { postings: [addPosting, ...postings] },
                });
            }   catch (e) {
                console.error(e);
            }

            const { myprofile } = cache.readQuery({ query: QUERY_MYPROFILE });
            cache.writeQuery({
                query: QUERY_MYPROFILE,
                data: { myprofile: { ...myprofile, postings: [...myprofile.postings, addPosting] } },
            });
        },
    });
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addPosting({
                variables: {
                    ...newPosting,
                    // postAuthor: Auth.getProfile.data.username,
                },
            });

            setNewPosting('');
        }   catch (err) {
            console.error(err);
        }
    };

    return (
        <div>

            <h1>New Posting</h1>
            <form onSubmit={handleSubmit} className="gameform">
                <input
                    name="title"
                    placeholder="Game Title"
                    // value={title}
                    onChange={handleChange}>
                </input>
                <input
                    name="category"
                    placeholder="Category"
                    // value={publisher}
                    onChange={handleChange}>
                </input>
                <input
                    name="platform"
                    placeholder="Platform"
                    // value={publisher}
                    onChange={handleChange}>
                </input>
                <input
                    name="publisher"
                    placeholder="Publisher"
                    // value={publisher}
                    onChange={handleChange}>
                </input>
                <input
                    name="genre"
                    placeholder="Genre"
                    // value={publisher}
                    onChange={handleChange}>
                </input>
                <input
                    name="condition"
                    placeholder="Condition"
                    // value={condition}
                    onChange={handleChange}>
                </input>
                <textarea
                    name="description"
                    placeholder="Description"
                    // value={description}
                    onChange={handleChange}>
                </textarea>

                <div className="col-12 col-lg-3">
                    <button className="btn btn-primary btn-block py-3" type="submit">
                        Add Posting
                    </button>
                </div>
            </form>

        </div>
    );
};

export default GameForm;