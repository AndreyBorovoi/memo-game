import React, {Component}  from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import {changeDifficult} from '../creators';
import { connect } from 'react-redux';

export const EASY = 'easy';
export const MEDIUM = 'medium';
export const HARD = 'hard';

class Difficulty extends Component{
  constructor(props){
     super(props);
     this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.props.changeDifficult(event.target.value);
  }

  render() {
    return (
      <FormControl
        component='fieldset'
        size='small'
        style={{marginTop:'50px'}}
      >
        <FormLabel component='legend' style={{margin:'auto'}}>
          <Typography variant="h5" color='textPrimary' gutterBottom>
            Сложность
          </Typography>
        </FormLabel>

        <RadioGroup
          value={this.props.difficult}
          onChange={this.handleChange}
          row={false}
        >

          <FormControlLabel value={EASY} control={<Radio />} label='Легко'/>
          <FormControlLabel value={MEDIUM} control={<Radio />} label='Средне' />
          <FormControlLabel value={HARD} control={<Radio />} label='Сложно' />

        </RadioGroup>
      </FormControl>
    );
  }
}

const mapStateToProps = state => {
  return {
    difficult: state.App.difficult
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeDifficult: (value) => dispatch(changeDifficult(value)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Difficulty);
