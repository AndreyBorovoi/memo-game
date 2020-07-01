import {CHANGE_DIFFICULT, CHANGE_TIME, CHANGE_GAME_STATUS,
   CREATE_NEW_CARDS, CHANGE_CARD_STATE} from './actions';

export function changeDifficult(difficult){
  return {type: CHANGE_DIFFICULT, difficult};
}

export function changeTime(time){
  return {type: CHANGE_TIME, time};
}

export function changeGameStatus(onGame){
  return {type: CHANGE_GAME_STATUS, onGame};
}

export function createNewCards(){
  return {type: CREATE_NEW_CARDS};
}

export function changeCardState(id){
  return {type: CHANGE_CARD_STATE, id};
}
