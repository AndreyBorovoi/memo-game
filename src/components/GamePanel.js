import React from 'react';
import Grid from '@material-ui/core/Grid';

import Timer from './Timer';
import Score from './Score';


export default function GamePanel() {
  return (
    <div>
      <Grid container
        direction='row'
        justify='space-evenly'
        alignItems='center'
        style={{display:'flex', flexGrow:0}}
      >
        <Timer/>
        <Score/>

      </Grid>
    </div>
  );
}
