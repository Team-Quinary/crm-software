import styled from '@mui/material/styles'

import Button from '@mui/material/Button';
import React from 'react'

const DeleteButton = styled(Button)(({theme}) => ({
    variant:"contained",
    color:"error",
}));


export default function CustomDeleteButton({onClick}) {
    return(
        <>
        <DeleteButton onClick={onClick}> 
            DELETE
        </DeleteButton>
        </>
    )
}
