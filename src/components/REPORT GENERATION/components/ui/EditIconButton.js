import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';

import { alpha, styled } from '@mui/material/styles';

const EditIconButton = styled(IconButton)(({theme}) => ({
backgroundColor: "#c0c7f0",
  color: theme.palette.primary.light,
  borderRadius: 4,

  '&:hover': {
    color: "#fff",
    backgroundColor: theme.palette.primary.light
  },

  '&:active': {
    color: "#fff",
    backgroundColor: theme.palette.primary.light
  }

}))

export default function CustomEditButton({onClick}) {
  return (
    <>
        <EditIconButton onClick={onClick}>
            {<EditIcon/>}
        </EditIconButton>
      
    </>
  )
}
