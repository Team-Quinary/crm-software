import styled from '@mui/material/styles';

import Button from '@mui/material/Button';
import React from 'react';

const CustomButton = styled(Button)(({theme}) => ({
    variant:"contained",
    color:"primary",
}));


export default function CustomButton({onClick}) {
    return(
        <>
        <CustomButton onClick={onClick}> 
            CONFIRM
        </CustomButton>
        </>
    )
}