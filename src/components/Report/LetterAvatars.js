import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function LetterAvatars() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <Stack direction="row" spacing={2}>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>C</Avatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>R</Avatar>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>M</Avatar>
      </Stack>
    </div>
  );
}