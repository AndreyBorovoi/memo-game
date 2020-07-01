import {CARD_CLOSE} from './components/AppCard';

function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}

function decToHex(n) {
  return Number(n).toString(16);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateCarts(sizeX, sizeY){
  let colors = new Set();
  while(colors.size !== sizeX*sizeY/2){
    colors = colors.add("#" +
      decToHex(randomInteger(1, 7) * 32)
       + decToHex(randomInteger(1, 7) * 32)
       + decToHex(randomInteger(1, 7) * 32)
     );
  }
  let position = shuffle([...colors, ...colors]);

  let cards = new Map();
  for (let i = 0; i < position.length; i++) {
    cards.set(i, {id:i, color:position[i], cardState:CARD_CLOSE})
  }
  return cards;
}

export default generateCarts;
