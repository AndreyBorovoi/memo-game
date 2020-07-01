import React, {Component}  from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import {changeCardState} from '../creators';
import { connect } from 'react-redux';

import './AppCard.css';

// Состояния карточки
export const CARD_OPEN = 'CARD_OPEN';
export const CARD_CLOSE = 'CARD_CLOSE';
export const CARD_DELETED = 'CARD_DELETED';
export const CARD_DELETING = 'CARD_DELETING';
export const CARD_CLOSING = 'CARD_CLOSING';

class AppCard extends Component{
  constructor(props){
     super(props);
     this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    if(this.props.cardState === CARD_CLOSE){
      this.props.changeCardState(this.props.id);
    }
  }

  render() {
    if(this.props.cardState === CARD_DELETING ||
       this.props.cardState === CARD_CLOSING){
      setTimeout(() => {
        if(this.props.cardState === CARD_DELETING ||
           this.props.cardState === CARD_CLOSING){
          this.props.changeCardState(this.props.id);
        }
      }, 500);
    }
    let width = this.props.style.width;
    let newWidth = parseFloat(width.slice(0, width.length-1)) - 2;
    newWidth = newWidth + '%';
    let inner;
    switch (this.props.cardState) {
      case CARD_DELETING:
      case CARD_CLOSING:
      case CARD_OPEN:
        inner = (
          <Typography
            component='div'
            style={{backgroundColor: this.props.color,
              height: '100%', width:'100%'}}/>);
        break;
      case CARD_CLOSE:
        inner = (
          <div
            className='CloseAppCard'
            style={{height: '100%', width:'100%'}}/>
        )
        break;
      case CARD_DELETED:
        return (
          <div
            className='DeletedAppCard CardHeight'
            style={{width: newWidth}}/>
        )
      default:
        return <>error</>;
      }
    return (
      <Card
        className='AppCard CardHeight'
        style={{width: newWidth}}
        onClick={this.onClick}>
        <CardActionArea
          style={{width:'100%', height:'100%'}}
        >
          {inner}
        </CardActionArea>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCardState: (id) => dispatch(changeCardState(id)),
  };
};

export default connect(null, mapDispatchToProps)(AppCard);
