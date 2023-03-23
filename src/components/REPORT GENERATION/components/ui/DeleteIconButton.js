import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';

import { alpha, styled } from '@mui/material/styles';


// const DeleteButton = styled(Button)(({theme})=>({
//     width:0,
//     height:40,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: "#ff8787",

//     '&:hover':{
//         backgroundColor: theme.palette.error.dark
//     },

//     '&:active':{
//         backgroundColor: theme.palette.error.main
//     }

// }))

const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#f7abab",
  color: theme.palette.error.light,
  borderRadius: 4,

  '&:hover': {
    color: "#fff",
    backgroundColor: theme.palette.error.light
  },

  '&:active': {
    color: "#fff",
    backgroundColor: theme.palette.error.light
  }

}))


export default function CustomDeleteButton({ onClick }) {
  return (
    <>

      <DeleteIconButton onClick={onClick}>
        {<DeleteIcon />}
      </DeleteIconButton>
    </>
  );
}