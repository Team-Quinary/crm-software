import React from 'react';
import { SpeedDial } from '@mui/material';
import {SpeedDialIcon} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
// import SpeedDialAction from '@mui/material';

export default function Dashboard() {
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');
        navigate("/components/Chat/Pages/MsgLogin")
      }
    return (
        <div className='home'>
            Home
  <SpeedDial
  ariaLabel="SpeedDial basic example"
  sx={{ position: 'absolute', bottom: 16, right: 16 }}
  icon={<SpeedDialIcon />}
  onClick={handleSubmit}
>
  {/* {actions.map((action) => (
    <SpeedDialAction
      key={action.name}
      icon={action.icon}
      tooltipTitle={action.name}
    />
  ))} */}
</SpeedDial>
        </div>
    )
}
