import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { UPDATE_POSTING } from '../../utils/mutations';

// Import Material UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const UpdateForm = (props) => {

    let category = ['undefined','Games', 'Console', 'Accessories', 'Action Figures', 'TCG', 'Board Games', 'Figurines'];
    let platform = ['undefined','NES', 'SNES', 'N64', 'GameCube', 'Wii', 'Wii U', 'Switch',
                    'GameBoy/Color', 'GameBoy Advance', 'Nintendo DS', 'Nintendo 3DS',
                    'PS1', 'PS2', 'PS3', 'PS4', 'PS5', 'PSP', 'PSVita',
                    'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series',
                    'Genesis', 'Game Gear', 'Sega CD', '32X', 'Sega Saturn', 'DreamCast',
                    ];
    let publisher = ['undefined','Nintendo', 'Microsoft', 'Sony', 'Bandai Namco', 'Ubisoft', 'EA Games',
                     'Square Enix', 'Konami', 'Sega', 'Capcom'];
    let genre = ['undefined','Platform', 'FPS', 'Survival Horror', 'Metroidvania', 'Visual Novels', 'Action RPG',
                 'RougeLikes', 'JRPG', 'Simulation', 'Fighting', 'Party', 'Turn-Based Strategy',
                 'Real-Time Strategy', 'Racing', 'Sports', 'Open World', 'Simulation', 'Horror'];
    let condition = ['undefined','New', 'Complete', 'Loose', 'Broken', 'Adventure'];

    console.log('props.posting');
    console.log(props.posting);

    useEffect(() => {
        setUpdatePosting({...props.posting})
    }, [props.posting]);


    const [ updatedPosting, setUpdatePosting ] = useState({
        postingId: props.posting._id,
        title: props.posting.title,
        category: props.posting.category,
        platform: props.posting.platform,
        publisher: props.posting.publisher,
        genre: props.posting.genre,
        condition: props.posting.condition,
        description: props.posting.description,
        imageid: props.posting.imageid,
    });

    const handleUpdate = (event) => {
        setUpdatePosting({ ...updatedPosting, [event.target.name]: event.target.value})
    };

    console.log('updatedposting');
    console.log(updatedPosting);

    const [updatePosting] = useMutation(UPDATE_POSTING);

    const confirmUpdate = async (event) => {
        let postingId = updatedPosting._id

        try {
            updatePosting({
                variables: { postingId, ...updatedPosting }
            })
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box>
            <Grid>
                <Paper elevation={5}>
                    <Grid>
                        <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Grid item sx={{ display: 'flex', justifyContent: 'center', m: 2.5 }}>
                                <h1>Update Posting</h1>
                            </Grid>
                            <TextField
                                sx={{ m: 2 }}
                                label='Title'
                                name='title'
                                placeholder='Title'
                                defaultValue={props.posting.title ?? " "}
                                onChange={handleUpdate}
                            />
                            <TextField
                                select
                                sx={{ m: 2 }}
                                label='Category'
                                name='category'
                                placeholder='Category'
                                onChange={handleUpdate}
                                defaultValue={props.posting.category ?? " "}
                            >
                                {category.map((category) => (
                                    <MenuItem value={category}>{category}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                sx={{ m: 2 }}
                                label='Platform'
                                name='platform'
                                placeholder='Platform'
                                onChange={handleUpdate}
                                defaultValue={props.posting.platform ?? " "}
                            >
                                {platform.map((platform) => (
                                    <MenuItem value={platform}>{platform}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                sx={{ m: 2 }}
                                label='Publisher'
                                name='publisher'
                                placeholder='Publisher'
                                onChange={handleUpdate}
                                defaultValue={props.posting.publisher ?? " "}
                            >
                                {publisher.map((publisher) => (
                                    <MenuItem value={publisher}>{publisher}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                sx={{ m: 2 }}
                                label='Genre'
                                name='genre'
                                placeholder='Genre'
                                onChange={handleUpdate}
                                defaultValue={props.posting.genre ?? " "}
                            >
                                {genre.map((genre) => (
                                    <MenuItem value={genre}>{genre}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                sx={{ m: 2 }}
                                label='Condition'
                                name='condition'
                                placeholder='Condition'
                                onChange={handleUpdate}
                                defaultValue={props.posting.condition ?? " "}
                            >
                                {condition.map((condition) => (
                                    <MenuItem value={condition}>{condition}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                sx={{ m: 2 }}
                                multiline
                                rows={5}
                                label='Description'
                                name='description'
                                placeholder='Description'
                                onChange={handleUpdate}
                                defaultValue={props.posting.description ?? " "}
                            />
                        </Grid>
                        {/* <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 2 }}>
                            <Grid item xs={10}>
                                {imageSelected ? (
                                    <img 
                                        src={URL.createObjectURL(imageSelected)} 
                                        width='100%' 
                                        alt=""
                                    ></img>
                                ) : (
                                    <h1>No Image</h1>
                                )}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <input 
                                    title=" "
                                    type="file" 
                                    onChange={(event) => {
                                        uploadImage(event.target.files[0]);
                                        setImageSelected(event.target.files[0]);
                                    }}
                                />
                            </Grid>
                        </Grid> */}
                        <Grid sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                            <button onClick={confirmUpdate} type='submit'>Update Post</button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Box>
    );
};

export default UpdateForm;