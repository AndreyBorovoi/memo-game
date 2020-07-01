import { combineReducers } from 'redux';

import generateCarts from './createCards';

import {CARD_OPEN, CARD_CLOSE, CARD_DELETED, CARD_DELETING,
   CARD_CLOSING} from './components/AppCard';

import {EASY, MEDIUM, HARD} from './components/Difficulty';

import {CHANGE_DIFFICULT, CHANGE_TIME, CHANGE_GAME_STATUS,
   CREATE_NEW_CARDS, CHANGE_CARD_STATE} from './actions';


let init_app_state = {difficult:'easy', score:0, gameStatus:false,
 sizeX:3, sizeY:4, time:0, startTime: null, cards: new Map()};

function App(state=init_app_state, action){
  let newState = {...state};
  if(state.cards.size){
    newState.cards = new Map(Array.from(state.cards.entries()));
  }
  else{
    newState.cards = new Map();
  }

  switch (action.type) {

    case CHANGE_DIFFICULT:
      newState.difficult = action.difficult;
      switch(action.difficult){
        case EASY:
          newState.sizeX = 3;
          newState.sizeY = 4;
          break;
        case MEDIUM:
          newState.sizeX = 5;
          newState.sizeY = 4;
          break;
        case HARD:
          newState.sizeX = 5;
          newState.sizeY = 6;
          break;
        default:
          return state;
      }
      return newState;

    case CHANGE_TIME:
      newState.time = action.time;
      return newState;

    case CHANGE_GAME_STATUS:
      if(newState.gameStatus !== action.onGame)
      {
        if(action.onGame){
          newState.startTime = new Date()-1;
          newState.score = 0;
        }
        else{
          localStorage.setItem('lastGameScore', newState.score);
          localStorage.setItem('lastGameTime', newState.time);
          if(localStorage.getItem('bestGameScore') < newState.score){
            localStorage.setItem('bestGameScore', newState.score);
          }
          newState.score = 0;
          newState.startTime = null;
          newState.time = 0;
        }
        newState.gameStatus = action.onGame;
        return newState;
      }
      return state;

    case CREATE_NEW_CARDS:
      newState.cards = generateCarts(newState.sizeX, newState.sizeY);
      return newState;

    case CHANGE_CARD_STATE:
      if(newState.cards.get(action.id).cardState === CARD_DELETING){
        newState.cards.get(action.id).cardState = CARD_DELETED;
        return newState;
      }
      if(newState.cards.get(action.id).cardState === CARD_CLOSING){
        newState.cards.get(action.id).cardState = CARD_CLOSE;
        return newState;
      }

      let opened = null;
      for(let card of newState.cards.values()) {
        if(card.cardState === CARD_OPEN){
          opened = card;
        }
      }
      if(opened){
        if(opened.id === action.id){
          return newState;
        }
        if(opened.color === newState.cards.get(action.id).color){
          newState.score = newState.score + Math.round(50/Math.sqrt(newState.time)) + 10;
          newState.cards.get(opened.id).cardState = CARD_DELETING;
          newState.cards.get(action.id).cardState = CARD_DELETING;

        }
        else{
          newState.cards.get(opened.id).cardState = CARD_CLOSING;
          newState.cards.get(action.id).cardState = CARD_CLOSING;
        }
      }
      else{
        newState.cards.get(action.id).cardState = CARD_OPEN;
      }
      return newState;

    default:
      return state
    }
}

const MemoApp = combineReducers({
  App
})

export default MemoApp;
