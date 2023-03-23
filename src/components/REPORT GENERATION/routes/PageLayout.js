import React from 'react'

import Grid from '@mui/material/Grid';
import Plans from './Plans/Plans';

export default function PageLayout() {
  return (
    <div>
      <Grid container spacing={1}>
      <Grid item xs={12}>
          {<Plans/>}
        </Grid>
      </Grid>
    </div>
  )
}
