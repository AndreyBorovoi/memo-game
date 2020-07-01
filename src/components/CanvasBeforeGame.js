import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {changeGameStatus, createNewCards} from '../creators';
import { connect } from 'react-redux';

import Difficulty from './Difficulty';

class CanvasBeforeGame extends Component{
  constructor(props){
     super(props);
     this.onClick = this.onClick.bind(this);
     if(!localStorage.getItem('bestGameScore')){
       localStorage.setItem('bestGameScore', 0);
     }
     if(!localStorage.getItem('lastGameScore')){
       localStorage.setItem('lastGameScore', 0);
     }
  }

  onClick(e){
    this.props.changeGameStatus(true);
    this.props.createNewCards();
  }

  render() {
      return (
        <Grid container
          direction='column'
          justify='space-evenly'
          alignItems='center'
        >
            <Difficulty/>

            <div>
              <Typography variant="h6" gutterBottom>
                Предыдущий счет: {localStorage.getItem('lastGameScore')}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Лучший счет: {localStorage.getItem('bestGameScore')}
              </Typography>
            </div>

            <Button
              variant='contained'
              color='primary'
              style={{marginTop:'50px'}}
              onClick={this.onClick}
            >
              Начать игру
            </Button>
        </Grid>
            )

  }
}

const mapStateToProps = state => {
  return {
    gameStatus: state.App.gameStatus,
    sizeX: state.App.sizeX,
    sizeY: state.App.sizeY
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeGameStatus: (value) => dispatch(changeGameStatus(value)),
    createNewCards: () => dispatch(createNewCards()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CanvasBeforeGame);
