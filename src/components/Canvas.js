import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';

import {changeGameStatus} from '../creators';
import { connect } from 'react-redux';

import GamePanel from './GamePanel';
import AppCard, {CARD_DELETED}  from './AppCard';


class Canvas extends Component{
  render() {
    let card_ids = Array.from(this.props.cards.keys());
    let ended = true;
    for(let i in card_ids){
      if((this.props.cards.get(Number(i))).cardState !== CARD_DELETED){
        ended = false;
      }
    }
    if(ended){
      this.props.changeGameStatus(false);
    }
    return (
      <div
        style={{display:'flex', flexDirection:'column', width:'100%', marginTop:'20px'}}
      >

        <GamePanel/>

        <div
          style={{display:'flex', width:'100%', justifyContent:'center', marginTop:'20px'}}
        >
          <GridList
            cols={this.props.sizeX}
            style={{width:'90%', margin:'0px', display:'flex',
              justifyContent:'space-between'}}
          >
            {card_ids.map((id)=>
              <AppCard
                key={id}
                id={id}
                color={this.props.cards.get(id).color}
                cardState={this.props.cards.get(id).cardState}
              />
            )}
          </GridList>
        </div>
      </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    sizeX: state.App.sizeX,
    cards: state.App.cards,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeGameStatus: (value) => dispatch(changeGameStatus(value)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
