import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';

import {changeTime} from '../creators';
import { connect } from 'react-redux';

class Timer extends Component{
  constructor(props){
     super(props);
     this.tick = this.tick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.time !== this.props.time){
      return true;
    }
    return false;
  }

  componentDidMount(){
    this.props.changeTime(0);
    this.timer = setInterval(this.tick, 50);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }

  tick(){
    let time = (new Date().valueOf() - this.props.startTime)/1000;
    this.props.changeTime(time);
  }

  render() {
    return (
      <Typography variant='h4'>{this.props.time.toFixed(1)}</Typography>
    );
  }
}


const mapStateToProps = state => {
  return {
    time: state.App.time,
    startTime: state.App.startTime,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTime: (time) => dispatch(changeTime(time)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
