import React from 'react';
// import { useState } from 'react';
import { useParams } from 'react-router-dom';

import UpdateForm from '../components/UpdateForm';

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_POSTING } from '../utils/queries';

import Box from '@mui/material/Box';

const Updatepage = () => {

    const { postingId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_POSTING, {
        variables: { postingId: postingId },
    });

    const posting = data?.posting || {};

    if (loading) {
        return <Box>Grabbing Post information</Box>;
    }

    return (
        <Box>
            <UpdateForm posting={posting}/>
        </Box>
    );
};

export default Updatepage;