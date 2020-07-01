import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

class Score extends Component{
  render() {
    return (
      <Typography variant='h4'>{this.props.score}</Typography>
    );
  }
}


const mapStateToProps = state => {
  return {
    score: state.App.score
  };
};

export default connect(mapStateToProps)(Score);
