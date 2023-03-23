import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import { alpha, styled } from '@mui/material/styles';

const CancelButton = styled(IconButton)(({theme})=>({
    backgroundColor: "#f7abab",
    color: theme.palette.error.light,
    borderRadius:4,
    height:25,
    width:25,

    '&:hover':{
        color:"#fff",
        backgroundColor: theme.palette.error.light
    },

    '&:active':{
        color:"#fff",
        backgroundColor: theme.palette.error.light
    }
    
}))


export default function CustomCancelButton({onClick}) { 
  return (  
    <>
    
    <CancelButton onClick={onClick}>
      {<CloseIcon fontSize='small'/>}
    </CancelButton>
    </>
  );
}