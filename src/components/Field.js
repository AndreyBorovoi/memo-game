import React, {Component} from 'react';

import { connect } from 'react-redux';

import Canvas from './Canvas';
import CanvasBeforeGame from './CanvasBeforeGame';

class Field extends Component{

  render() {
    if(this.props.gameStatus){
      return <div style={{display:'flex', flexGrow:1}}><Canvas/></div>
    }
    else{
      return <div style={{display:'flex', flexGrow:1}}><CanvasBeforeGame/></div>
    }
  }
}

const mapStateToProps = state => {
  return {
    gameStatus: state.App.gameStatus
  };
};

export default connect(mapStateToProps)(Field);
