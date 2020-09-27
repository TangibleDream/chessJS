'use strict';
import { squareColor, getY, getX, flipValue } from './helpers.js';
import pieces from './pieces.js'

const boardRefresh = async (chessGame) => {
    let squares = [];
    let anchorElement = [];
    let addAnchor = false;
    let pieceNum = -1;
    let element = document.getElementById('chessBoard');
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    for (let i = 0; i < 64; i ++){
        addAnchor = false;
        squares[i] = document.createElement("img");
        pieceNum = await piecePresent(i);
        if (pieceNum > -1){
          addAnchor = true;
          switch (chessGame.getPieces[pieceNum].piece){
            case 'White King' :
              squareColor(i) === "black" ? squares[i].src = "images\\wkingbbkgr.png" : squares[i].src = "images\\wkingwbkgr.png";
              break;
            case 'White Queen' :
              squareColor(i) === "black" ? squares[i].src = "images\\wquenbbkgr.png" : squares[i].src = "images\\wquenwbkgr.png";
              break;
            case 'White King Bishop' :
            case 'White Queen Bishop' :
              squareColor(i) === "black" ? squares[i].src = "images\\wbishopbbkgr.png" : squares[i].src = "images\\wbishopwbkgr.png";
              break;
            case 'White King Knight' :
            case 'White Queen Knight' :
              squareColor(i) === "black" ? squares[i].src = "images\\wknightbbkgr.png" : squares[i].src = "images\\wknightwbkgr.png";
              break;
            case 'White King Rook' :
            case 'White Queen Rook' :
              squareColor(i) === "black" ? squares[i].src = "images\\wrookbbkgr.png" : squares[i].src = "images\\wrookwbkgr.png";
              break;
            case 'White Pawn':
              squareColor(i) === "black" ? squares[i].src = "images\\wpwnbbkgr.png" : squares[i].src = "images\\wpwnwbkgr.png";
              break;
            case 'Black King' :
              squareColor(i) === "black" ? squares[i].src = "images\\bkingbbkgr.png" : squares[i].src = "images\\bkingwbkgr.png";
              break;
            case 'Black Queen' :
              squareColor(i) === "black" ? squares[i].src = "images\\bquenbbkgr.png" : squares[i].src = "images\\bquenwbkgr.png";
              break;
            case 'Black King Bishop' :
            case 'Black Queen Bishop' :
              squareColor(i) === "black" ? squares[i].src = "images\\bbishopbbkgr.png" : squares[i].src = "images\\bbishopwbkgr.png";
              break;
            case 'Black King Knight' :
            case 'Black Queen Knight' :
              squareColor(i) === "black" ? squares[i].src = "images\\bknightbbkgr.png" : squares[i].src = "images\\bknightwbkgr.png";
              break;
            case 'Black King Rook' :
            case 'Black Queen Rook' :
              squareColor(i) === "black" ? squares[i].src = "images\\brookbbkgr.png" : squares[i].src = "images\\brookwbkgr.png";
              break;
            case 'Black Pawn' :
              squareColor(i) === "black" ? squares[i].src = "images\\bpwnbbkgr.png" : squares[i].src = "images\\bpwnwbkgr.png";
              break;
          }
        } else {
          if (game.getGameState === 2)  addAnchor = true;
          squareColor(i) === "black" ? squares[i].src = "images\\bbkgr.png" : squares[i].src = "images\\wbkgr.png";
        }
        if (addAnchor) {
            anchorElement[i] = document.createElement('a');
            anchorElement[i].id = `${i}`;
            anchorElement[i].href = '#';
            element.appendChild(anchorElement[i]);
            document.getElementById(`${i}`).addEventListener("click", function(e) { movePiece(this.id, chessGame) });
            document.getElementById(`${i}`).appendChild(squares[i]);
        } else {
            element.appendChild(squares[i]);
        }
        if (((i+1) % 8 === 0) && (i < 60))
        {
          element.appendChild(document.createElement('br'));
        };
    };
};

const compassRose = () => {
  let Object = {
    result: [],
    get getResult() { return this.result; },
    set setResult(result) { this.result.push(result); },
    set setResultInc(result) {
      this.result.push(result);
      this.moves++;
    },
    moves: 0,
    get getMoves() { return this.moves; },
    get incMoves() { this.moves++; },
    location: 0,
    get getLocation() { return this.location; },
    set setLocation(location) { this.location = location; },
    noMoreMoves: false,
    get getNoMoreMoves() { return this.noMoreMoves; },
    set setNoMoreMoves(nMMBool) { this.noMoreMoves = nMMBool; }
  }
  return(Object);
};

const changePlayers = (chessGame) => {
  (chessGame.getColorPlaying === 'White' ? chessGame.setColorPlaying = 'Black' : chessGame.setColorPlaying = 'White');
  for(let i = 0; i < 32; i ++) {
    if (chessGame.getPieces[i].position != -1) chessGame.setDestination = [i, flipValue(chessGame.getPieces[i].position)];
  }
  stateOne(chessGame);
};

const checkKnightX = (loc) => {
  let result = []
  switch (getX(loc)) {
    case 1:
      result = [-17,-10,6,15];
      break;
    case 2:
      result = [-10,6];
      break;
    case 7:
      result = [-6,10];
      break;
    case 8:
      result = [-15,-6,10,17];
      break;
  }
  return result;
};

const checkKnightY = (loc) => {
  let result = []
  switch (getY(loc)) {
    case 1:
      result = [-6,-10,-15,17];
      break;
    case 2:
      result = [-15,-17];
      break;
    case 7:
      result = [15,17];
      break;
    case 8:
      result = [6,10,15,17];
      break;
  }
  return result;
};

const east = (id,chessGame) => {
  let cr = compassRose();
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(chessGame.getPieces[id].position + (1 * (cr.getMoves + 1)));
    if (cr.getLocation != -1) {
      if (chessGame.getPieces[cr.getLocation].piece.charAt(0) != chessGame.getColorPlaying.charAt(0)) {
        let pieceCode = chessGame.getPieces[cr.getLocation].piece.slice(chessGame.getPieces[cr.getLocation].piece.length - 2);
        if ((['en','ok'].includes(pieceCode) && [0,1].includes(id)) || (pieceCode === 'ng' && cr.getMoves === 0)) {
          chessGame.setCheck = true;
        }
        cr.setResultInc = chessGame.getPieces[id].position + (1 * (cr.getMoves + 1));
        cr.setNoMoreMoves = true; }
      if (cr.getMoves === 0){ cr.setResult = chessGame.getPieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = chessGame.getPieces[id].position + (1 * (cr.getMoves + 1)); }
    if (chessGame.getPieces[id].position + (1 * (cr.getMoves + 1)) > 63 || getX(chessGame.getPieces[id].position + (1 * (cr.getMoves + 1))) === 1 ) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
};

const game = {
  pieces,
  gameState: 0,
  colorPlaying: 'White',
  moveAvailable: [],
  chosenPiece: -1,
  check: false,
  shortCastleWhite: true,
  longCastleWhite: true,
  shortCastleBlack: true,
  longCastleBlack: true,
  get getShortCastleWhite() {
    return this.shortCastleWhite;
  },
  get getLongCastleWhite() {
    return this.longCastleWhite;
  },
  get getShortCastleBlack() {
    return this.shortCastleBlack;
  },
  get getLongCastleBlack() {
    return this.longCastleBlack;
  },
  get getCheck() {
    return this.check;
  },
  get getPieces() {
    return this.pieces;
  },
  get getGameState() {
    return this.gameState;
  },
  get getColorPlaying() {
    return this.colorPlaying;
  },
  get getMovesAvailable() {
    return this.moveAvailable;
  },
  get getChosenPiece() {
    return this.chosenPiece;
  },
  set setShortCastleWhite(castleBool) {
    this.shortCastleWhite = castleBool;
  },
  set setLongCastleWhite(castleBool) {
    this.longCastleWhite = castleBool;
  },
  set setShortCastleBlack(castleBool) {
    this.shortCastleBlack = castleBool;
  },
  set setLongCastleBlack(castleBool) {
    this.longCastleBlack = castleBool;
  },
  set setCheck(checkBool) {
    this.check = checkBool;
  },
  set setGameState(state) {
    this.gameState = state;
  },
  set setColorPlaying(color) {
    this.colorPlaying = color;
  },
  set setMovesAvailable(moves) {
    this.moveAvailable = moves;
  },
  set setChosenPiece(pieceLocation) {
    this.chosenPiece = pieceLocation;
  },
  set setDestination(pdArr) {
    this.pieces[pdArr[0]].position = pdArr[1];
  },
  set setPiece(pArr) {
    this.pieces[pArr[0]].piece = pArr[1];
  }
};

const inCheck = (chessGame) => {
  let result = false;
  let threats = [];
  let kingLoc = -1;
  chessGame.setCheck = false;
  (chessGame.getColorPlaying === 'White' ? kingLoc = 0 : kingLoc = 1);
  east(kingLoc,chessGame);
  west(kingLoc,chessGame);
  north(kingLoc,chessGame);
  northEast(kingLoc,chessGame);
  northWest(kingLoc,chessGame);
  south(kingLoc,chessGame);
  southEast(kingLoc,chessGame);
  southWest(kingLoc,chessGame);
  knightMoves(kingLoc,chessGame);
  if (chessGame.getCheck === true) result = true;
  return result;
}

const knightMoves = (id,chessGame) => {
  let mathSet=[-17,-15,-10,-6,6,10,15,17]
  let removeSet = []
  removeSet = removeSet.concat(checkKnightX(chessGame.getPieces[id].position))
  removeSet = removeSet.concat(checkKnightY(chessGame.getPieces[id].position))
  removeSet = removeDups(removeSet);
  mathSet = remove(mathSet, removeSet);
  let position = -1
  let result = [id]
  for (let correction of mathSet){
    position = chessGame.getPieces[id].position + correction
    if (piecePresent(position) === -1  ) {result = result.concat(position);}
    else {
      if (chessGame.getPieces[piecePresent(position)].piece.charAt(0) != chessGame.getColorPlaying.charAt(0)) {
        let pieceCode = chessGame.getPieces[piecePresent(position)].piece.slice(chessGame.getPieces[piecePresent(position)].piece.length - 2);
        if (pieceCode === 'ht') chessGame.setCheck = true;
        result = result.concat(position);
      }
    }
  }
  return result;
}

const movePiece = (id,chessGame) => {
  let capture = false;
  let capturePiece = -1;
  let init = false;
  for (let i = 0; i < 32; i ++){
    if (chessGame.getPieces[i].position === parseInt(id)){
      switch(chessGame.getGameState) {
        case 2:
          capture = true;
          capturePiece = chessGame.getPieces[i];
        break;
        case 1:
          if(chessGame.getPieces[i].piece.charAt(0) != chessGame.getColorPlaying.charAt(0)){
            instructionMessage.setAttribute('style', 'white-space: pre;');
            instructionMessage.textContent = `This is not a ${chessGame.getColorPlaying.toLowerCase()} player piece. \r\n Select your own color piece.`;
          } else {
            let move = moves(i,chessGame);
            instructionMessage.setAttribute('style', 'white-space: pre;');
            if (isNaN(move[0])) { instructionMessage.textContent = `You are blocked (${move}) \r\n Select a different piece.`; }
            else {
              stateTwo(move, chessGame);
              init = true;
            }
          }
        break;
      }
    }
  }
  if (game.getGameState === 2 && init === false) {
    if (game.getMovesAvailable.includes(parseInt(id))) {     //V A L I D   S Q U A R E   L O G I C
      let oldDest = chessGame.getPieces[chessGame.getChosenPiece].position;
      let oldCapture = -1
      if (capture === true) {
        oldCapture = capturePiece.position;
        capturePiece.position = -1
      };
      chessGame.setDestination = [chessGame.getChosenPiece, parseInt(id)];
      if (chessGame.getCheck && inCheck(chessGame)) {        //C H E C K   L O G I C   B E G I N S
        instructionMessage.textContent = 'This move doesn\'t get you out of check \r\n\'go back\' and Select a different piece.';
        chessGame.setDestination = [chessGame.getChosenPiece, oldDest];
        if (capture === true) {
          capturePiece.position = oldCapture;
        };
        boardRefresh(chessGame);
      } else {
        if (inCheck(chessGame)){
          instructionMessage.textContent = 'This move will put you in check \r\n\'go back\' and Select a different piece.';
          chessGame.setDestination = [chessGame.getChosenPiece, oldDest];
          if (capture === true) {
            capturePiece.position = oldCapture;
          };
          boardRefresh(chessGame);
        } else {                                            //C H E C K   L O G I C   E N D S
        //castle go logic
          let pieceCode = chessGame.getPieces[chessGame.getChosenPiece].piece;
          if((pieceCode === 'White King Rook' && parseInt(id) === 61 && chessGame.getShortCastleWhite === true) || (pieceCode === 'Black King Rook' && parseInt(id) === 58 && chessGame.getShortCastleBlack === true) ){
            let castleGo = window.confirm("Would you like to castle?");
            if (castleGo) {
              let kingLoc = (chessGame.getColorPlaying === 'White' ? 0 : 1);
              chessGame.setDestination = (chessGame.getColorPlaying === 'White' ? [0,62] : [1,57]);
              if (kingLoc === 0){
                chessGame.setShortCastleWhite = false;
                chessGame.setLongCastleWhite = false;
              } else {
                chessGame.setShortCastleBlack = false;
                chessGame.setLongCastleBlack = false;
              }
            }
          }else{
            switch(chessGame.getPieces[chessGame.getChosenPiece].piece){
              case 'White King Rook': chessGame.setShortCastleWhite = false; break;
              case 'Black King Rook': chessGame.setShortCastleBlack = false; break;
              case 'White King': chessGame.setShortCastleWhite = false; chessGame.setLongCastleWhite = false; break;
              case 'Black King': chessGame.setShortCastleBlack = false; chessGame.setLongCastleBlack = false; break;
            }
          }
          if((pieceCode === 'White Queen Rook' && parseInt(id) === 59 && chessGame.getLongCastleWhite === true) || (pieceCode === 'Black Queen Rook' && parseInt(id) === 60 && chessGame.getLongCastleBlack === true) ){
            let castleGo = window.confirm("Would you like to castle?");
            if (castleGo) {
              let kingLoc = (chessGame.getColorPlaying === 'White' ? 0 : 1);
              chessGame.setDestination = (chessGame.getColorPlaying === 'White' ? [0,58] : [1,61]);
              if (kingLoc === 0){
                chessGame.setShortCastleWhite = false;
                chessGame.setLongCastleWhite = false;
              } else {
                chessGame.setShortCastleBlack = false;
                chessGame.setLongCastleBlack = false;
              }
            }
          }else{
            switch(chessGame.getPieces[chessGame.getChosenPiece].piece){
              case 'White Queen Rook': chessGame.setLongCastleWhite = false; break;
              case 'Black Queen Rook': chessGame.setLongCastleBlack = false; break;
            }
          }
          // P A W N   P R O M O T I O N
        pieceCode = chessGame.getPieces[chessGame.getChosenPiece].piece.slice(chessGame.getPieces[chessGame.getChosenPiece].piece.length - 2);
        if ([0,1,2,3,4,5,6,7].includes(parseInt(id)) && pieceCode == 'wn'){
          promotionMessage.style.visibility = "visible";
          promotionForm.style.visibility = "visible";
          actionButton.style.visibility = "hidden";
        }
        boardRefresh(chessGame);
        stateThree(chessGame);
      }}
    } else {   //I N V A L I D   S Q U A R E   L O G I C
      let pieceCode = chessGame.getPieces[chessGame.getChosenPiece].piece.slice(chessGame.getPieces[chessGame.getChosenPiece].piece.length - 2);
      switch (pieceCode) {
        case 'wn':
          let pm = '1 space';
          ([48,49,50,51,52,53,54,55].includes(chessGame.getPieces[chessGame.getChosenPiece].position) ? pm = '2 spaces' : pm = '1 space');
          instructionMessage.textContent = `This pawn can move ${pm} and capture diagonally 1 space where possible. Either select a valid square or \r\n Press \'go back\' and Select a different piece.`;
        break;
        case 'ok':
          instructionMessage.textContent = `A rook can move vertically and horizontally where not blocked. Either select a valid square or \r\n Press \'go back\' and Select a different piece.`;
        break;
        case 'ht':
          instructionMessage.textContent = `A knight can move in a 1-2 or 2-1 L pattern. Either select a valid square or \r\n Press \'go back\' and Select a different piece.`;
        break;
        case 'op':
          instructionMessage.textContent = `A bishop can move diagonally where not blocked. Either select a valid square or \r\n Press \'go back\' and Select a different piece.`;
        break;
        case 'en':
          instructionMessage.textContent = `A Queen can move vertically, horizontally, and diagonally where not blocked. Either select a valid square or \r\n Press \'go back\' and Select a different piece.`;
        break;
        case 'ng':
          instructionMessage.textContent = `A King can move vertically, horizontally, and diagonally 1 space  where not blocked. Either select a valid square or \r\n Press \'go back\' and Select a different piece.`;
        break;
        default :
          instructionMessage.textContent = 'This piece can\'t move here. Either select a valid square or \r\n Press \'go back\' and Select a different piece.';
        break;
      }
    }
  }
};

const moves = (id,chessGame) => {
  let result = [];
  let nm = [];
  let sm = [];
  let em = [];
  let wm = [];
  let nwm = [];
  let nem = [];
  let sem = [];
  let swm = [];
  switch (chessGame.getPieces[id].piece) {
    case "White King Rook" :
    case "Black King Rook" :
    case "White Queen Rook" :
    case "Black Queen Rook" :
    {
      if (getY(chessGame.getPieces[id].position) > 1) { nm = north(id,chessGame)};
      if (getY(chessGame.getPieces[id].position) < 8) { sm = south(id,chessGame)};
      if (getX(chessGame.getPieces[id].position) < 8) { em = east(id,chessGame)};
      if (getX(chessGame.getPieces[id].position) > 1) { wm = west(id,chessGame)};
      let blocked = true;
      if (Number.isInteger(nm[0]) || Number.isInteger(sm[0]) || Number.isInteger(em[0]) || Number.isInteger(wm[0])) blocked = false;
      if (blocked === false){
        result.push(id);
        if (Number.isInteger(nm[0])) result = result.concat(nm);
        if (Number.isInteger(sm[0])) result = result.concat(sm);
        if (Number.isInteger(em[0])) result = result.concat(em);
        if (Number.isInteger(wm[0])) result = result.concat(wm);
      }else{
        if (isNaN(nm[0])) result = result.concat(nm);
        if (isNaN(sm[0])) result = result.concat(sm);
        if (isNaN(em[0])) result = result.concat(em);
        if (isNaN(wm[0])) result = result.concat(wm);
      }
    }
    break;
    case "White King Bishop" :
    case "Black King Bishop" :
    case "White Queen Bishop" :
    case "Black Queen Bishop" :
    {
      if (getY(chessGame.getPieces[id].position) > 1 && getX(chessGame.getPieces[id].position) > 1) { nwm = northWest(id,chessGame)};
      if (getY(chessGame.getPieces[id].position) > 1 && getX(chessGame.getPieces[id].position) < 8) { nem = northEast(id,chessGame)};
      if (getY(chessGame.getPieces[id].position) < 8 && getX(chessGame.getPieces[id].position) < 8) { sem = southEast(id,chessGame)};
      if (getY(chessGame.getPieces[id].position) < 8 && getX(chessGame.getPieces[id].position) > 1) { swm = southWest(id,chessGame)};
        let blocked = true;
        if (Number.isInteger(nwm[0]) || Number.isInteger(nem[0]) || Number.isInteger(sem[0]) || Number.isInteger(swm[0])) blocked = false;
        if (blocked === false){
          result.push(id);
          if (Number.isInteger(nwm[0])) result = result.concat(nwm);
          if (Number.isInteger(nem[0])) result = result.concat(nem);
          if (Number.isInteger(sem[0])) result = result.concat(sem);
          if (Number.isInteger(swm[0])) result = result.concat(swm);
        } else{
          if (isNaN(nwm[0])) result = result.concat(nwm);
          if (isNaN(nem[0])) result = result.concat(nem);
          if (isNaN(sem[0])) result = result.concat(sem);
          if (isNaN(swm[0])) result = result.concat(swm);
        }
    }
    break;
    case "White Queen" :
    case "Black Queen" :
    {
      if (getY(chessGame.getPieces[id].position) > 1) { nm = north(id,chessGame)};
      if (getY(chessGame.getPieces[id].position) < 8) { sm = south(id,chessGame)};
      if (getX(chessGame.getPieces[id].position) < 8) { em = east(id,chessGame)};
      if (getX(chessGame.getPieces[id].position) > 1) { wm = west(id,chessGame)};
      if (getY(chessGame.getPieces[id].position) > 1 && getX(chessGame.getPieces[id].position) > 1) { nwm = northWest(id,chessGame)};
      if (getY(chessGame.getPieces[id].position) > 1 && getX(chessGame.getPieces[id].position) < 8) { nem = northEast(id,chessGame)};
      if (getY(chessGame.getPieces[id].position) < 8 && getX(chessGame.getPieces[id].position) < 8) { sem = southEast(id,chessGame)};
      if (getY(chessGame.getPieces[id].position) < 8 && getX(chessGame.getPieces[id].position) > 1) { swm = southWest(id,chessGame)};
        let blocked = true;
        if (Number.isInteger(nm[0]) || Number.isInteger(sm[0]) || Number.isInteger(em[0]) || Number.isInteger(wm[0]) ||
        Number.isInteger(nwm[0]) || Number.isInteger(nem[0]) || Number.isInteger(sem[0]) || Number.isInteger(swm[0])) blocked = false;
        if (blocked === false){
          result.push(id);
          if (Number.isInteger(nm[0])) result = result.concat(nm);
          if (Number.isInteger(sm[0])) result = result.concat(sm);
          if (Number.isInteger(em[0])) result = result.concat(em);
          if (Number.isInteger(wm[0])) result = result.concat(wm);
          if (Number.isInteger(nwm[0])) result = result.concat(nwm);
          if (Number.isInteger(nem[0])) result = result.concat(nem);
          if (Number.isInteger(sem[0])) result = result.concat(sem);
          if (Number.isInteger(swm[0])) result = result.concat(swm);
        } else{
          if (isNaN(nm[0])) result = result.concat(nm);
          if (isNaN(sm[0])) result = result.concat(sm);
          if (isNaN(em[0])) result = result.concat(em);
          if (isNaN(wm[0])) result = result.concat(wm);
          if (isNaN(nwm[0])) result = result.concat(nwm);
          if (isNaN(nem[0])) result = result.concat(nem);
          if (isNaN(sem[0])) result = result.concat(sem);
          if (isNaN(swm[0])) result = result.concat(swm);
        }
    }
    break;
      case "White King" :
      case "Black King" :
      {
        if (getY(chessGame.getPieces[id].position) > 1) { nm = north(id,chessGame)};
        if (getY(chessGame.getPieces[id].position) < 8) { sm = south(id,chessGame)};
        if (getX(chessGame.getPieces[id].position) < 8) { em = east(id,chessGame)};
        if (getX(chessGame.getPieces[id].position) > 1) { wm = west(id,chessGame)};
        if (getY(chessGame.getPieces[id].position) > 1 && getX(chessGame.getPieces[id].position) > 1) { nwm = northWest(id,chessGame)};
        if (getY(chessGame.getPieces[id].position) > 1 && getX(chessGame.getPieces[id].position) < 8) { nem = northEast(id,chessGame)};
        if (getY(chessGame.getPieces[id].position) < 8 && getX(chessGame.getPieces[id].position) < 8) { sem = southEast(id,chessGame)};
        if (getY(chessGame.getPieces[id].position) < 8 && getX(chessGame.getPieces[id].position) > 1) { swm = southWest(id,chessGame)};
          let blocked = true;
          if (Number.isInteger(nm[0]) || Number.isInteger(sm[0]) || Number.isInteger(em[0]) || Number.isInteger(wm[0]) ||
          Number.isInteger(nwm[0]) || Number.isInteger(nem[0]) || Number.isInteger(sem[0]) || Number.isInteger(swm[0])) blocked = false;
          if (blocked === false){
            result.push(id);
            if (Number.isInteger(nm[0])) result = result.concat(nm[0]);
            if (Number.isInteger(sm[0])) result = result.concat(sm[0]);
            if (Number.isInteger(em[0])) result = result.concat(em[0]);
            if (Number.isInteger(wm[0])) result = result.concat(wm[0]);
            if (Number.isInteger(nwm[0])) result = result.concat(nwm[0]);
            if (Number.isInteger(nem[0])) result = result.concat(nem[0]);
            if (Number.isInteger(sem[0])) result = result.concat(sem[0]);
            if (Number.isInteger(swm[0])) result = result.concat(swm[0]);
          } else{
            if (isNaN(nm[0])) result = result.concat(nm);
            if (isNaN(sm[0])) result = result.concat(sm);
            if (isNaN(em[0])) result = result.concat(em);
            if (isNaN(wm[0])) result = result.concat(wm);
            if (isNaN(nwm[0])) result = result.concat(nwm);
            if (isNaN(nem[0])) result = result.concat(nem);
            if (isNaN(sem[0])) result = result.concat(sem);
            if (isNaN(swm[0])) result = result.concat(swm);
          }
      }
    break;
    case "White Pawn" :
    case "Black Pawn" :
    {
      if (getY(chessGame.getPieces[id].position) > 1) { nm = north(id,chessGame,true)};
      if (getY(chessGame.getPieces[id].position) > 1 && getX(chessGame.getPieces[id].position) > 1) { nwm = northWest(id,chessGame,true)};
      if (getY(chessGame.getPieces[id].position) > 1 && getX(chessGame.getPieces[id].position) < 8) { nem = northEast(id,chessGame,true)};
      let blocked = true;
      if (Number.isInteger(nm[0]) || Number.isInteger(nem[0]) || Number.isInteger(nwm[0])) blocked = false;
      if (blocked === false){
        result.push(id);
        if ([48,49,50,51,52,53,54,55].includes(chessGame.getPieces[id].position)) {
          if (Number.isInteger(nm[0])) result = result.concat(nm[0], nm[1]);
        }
        else {
          if (Number.isInteger(nm[0])) result = result.concat(nm[0]);}
        if (Number.isInteger(nem[0])) result = result.concat(nem[0]);
        if (Number.isInteger(nwm[0])) result = result.concat(nwm[0]);
      } else { if (isNaN(nm[0])) result = result.concat(nm); }
    }
    break;
    case "White King Knight" :
    case "Black King Knight" :
    case "White Queen Knight" :
    case "Black Queen Knight" :
    {
      result = knightMoves(id, chessGame);
    }
    break;
  }
  return result;
};

const north = (id,chessGame,isPawn = false) => {
  let cr = compassRose();
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(chessGame.getPieces[id].position - (8 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (chessGame.getPieces[cr.getLocation].piece.charAt(0) != chessGame.getColorPlaying.charAt(0) && isPawn === false) {
        let pieceCode = chessGame.getPieces[cr.getLocation].piece.slice(chessGame.getPieces[cr.getLocation].piece.length - 2);
        if ((['en','ok'].includes(pieceCode) && [0,1].includes(id)) || (pieceCode === 'ng' && cr.getMoves === 0)) {
          chessGame.setCheck = true;
        }
        cr.setResultInc = chessGame.getPieces[id].position - (8 * (cr.getMoves + 1));
        cr.setNoMoreMoves = true; }
      if (cr.getMoves === 0){ cr.setResult = chessGame.getPieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else {  cr.setResultInc = chessGame.getPieces[id].position - (8 * (cr.getMoves + 1)); }
    if (chessGame.getPieces[id].position - (8 * (cr.getMoves + 1)) < 0) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
};

const northEast = (id,chessGame,isPawn = false) => {
  let cr = compassRose();
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(chessGame.getPieces[id].position - (7 * (cr.getMoves + 1)))
    if ((cr.getLocation != -1 && isPawn === false) || (cr.getLocation != -1 && isPawn === true && cr.getMoves === 0)) {
      if (chessGame.getPieces[cr.getLocation].piece.charAt(0) != chessGame.getColorPlaying.charAt(0)) {
        let pieceCode = chessGame.getPieces[cr.getLocation].piece.slice(chessGame.getPieces[cr.getLocation].piece.length - 2);
        if ((['en','op'].includes(pieceCode) && [0,1].includes(id)) || (['wn','ng'].includes(pieceCode) && cr.getMoves === 0)) {
          chessGame.setCheck = true;
        }
        cr.setResultInc = chessGame.getPieces[id].position - (7 * (cr.getMoves + 1));
        cr.setNoMoreMoves = true; }
      if (cr.getMoves === 0){ cr.setResult = chessGame.getPieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { if (isPawn === false) {cr.setResultInc = chessGame.getPieces[id].position - (7 * (cr.getMoves + 1));}
     else { cr.setNoMoreMoves = true }}
    if (chessGame.getPieces[id].position - (7 * (cr.getMoves + 1)) < 0  || getX(chessGame.getPieces[id].position - (7 * (cr.getMoves + 1))) === 1) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
};

const northWest = (id,chessGame,isPawn = false) => {
  let cr = compassRose();
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(chessGame.getPieces[id].position - (9 * (cr.getMoves + 1)))
    if ((cr.getLocation != -1 && isPawn === false) || (cr.getLocation != -1 && isPawn === true && cr.getMoves === 0)) {
      if (chessGame.getPieces[cr.getLocation].piece.charAt(0) != chessGame.getColorPlaying.charAt(0)) {
        let pieceCode = chessGame.getPieces[cr.getLocation].piece.slice(chessGame.getPieces[cr.getLocation].piece.length - 2);
        if ((['en','op'].includes(pieceCode) && [0,1].includes(id)) || (['wn','ng'].includes(pieceCode) && cr.getMoves === 0)) {
          chessGame.setCheck = true;
        }
        cr.setResultInc = chessGame.getPieces[id].position - (9 * (cr.getMoves + 1));
        cr.setNoMoreMoves = true; }
      if (cr.getMoves === 0){ cr.setResult = chessGame.getPieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { if (isPawn === false) { cr.setResultInc = chessGame.getPieces[id].position - (9 * (cr.getMoves + 1));}
     else { cr.setNoMoreMoves = true }}
    if (chessGame.getPieces[id].position - (9 * (cr.getMoves + 1)) < 0 || getX(chessGame.getPieces[id].position - (9 * (cr.getMoves + 1))) === 8) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
};

const piecePresent = (num) => {
    let result = -1;
    for (let i = 0; i < 32; i ++){
        if (chessGame.getPieces[i].position === num)
        {
          result = i;
        }
    }
    return result
};

const pawnPromotion = (chessGame, promotionChoice) => {
  chessGame.setPiece = [chessGame.getChosenPiece, `${chessGame.getColorPlaying} ${promotionChoice.options[promotionForm.selectedIndex].value}`];
  promotionForm.style.visibility = "hidden";
  promotionMessage.style.visibility = "hidden";
  actionButton.style.visibility = "visible";
}

const remove = (setArr, toDelArr) => {
  let index = -1;
  for (let dels of toDelArr) {
    index = setArr.indexOf(dels);
    setArr.splice(index, 1);
  }
  return setArr;
};

const removeDups = (arr) => {
  let result = [...new Set(arr)];
  return result;
};

const south = (id,chessGame) => {
  let cr = compassRose();
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(chessGame.getPieces[id].position + (8 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (chessGame.getPieces[cr.getLocation].piece.charAt(0) != chessGame.getColorPlaying.charAt(0)) {
        let pieceCode = chessGame.getPieces[cr.getLocation].piece.slice(chessGame.getPieces[cr.getLocation].piece.length - 2);
        if ((['en','ok'].includes(pieceCode) && [0,1].includes(id)) || (pieceCode === 'ng' && cr.getMoves === 0)) {
          chessGame.setCheck = true;
        }
        cr.setResultInc = chessGame.getPieces[id].position + (8 * (cr.getMoves + 1));
        cr.setNoMoreMoves = true; }
      if (cr.getMoves === 0){ cr.setResult = chessGame.getPieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = chessGame.getPieces[id].position + (8 * (cr.getMoves + 1)); }
    if (chessGame.getPieces[id].position + (8 * (cr.getMoves + 1)) > 63) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
};

const southEast = (id,chessGame) => {
  let cr = compassRose();
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(chessGame.getPieces[id].position + (9 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (chessGame.getPieces[cr.getLocation].piece.charAt(0) != chessGame.getColorPlaying.charAt(0)) {
        let pieceCode = chessGame.getPieces[cr.getLocation].piece.slice(chessGame.getPieces[cr.getLocation].piece.length - 2);
        if ((['en','op'].includes(pieceCode) && [0,1].includes(id)) || (pieceCode === 'ng' && cr.getMoves === 0)) {
          chessGame.setCheck = true;
        }
        cr.setResultInc = chessGame.getPieces[id].position + (9 * (cr.getMoves + 1));
        cr.setNoMoreMoves = true; }
      if (cr.getMoves === 0){ cr.setResult = chessGame.getPieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = chessGame.getPieces[id].position + (9 * (cr.getMoves + 1)); }
    if (chessGame.getPieces[id].position + (9 * (cr.getMoves + 1)) > 63  || getX(chessGame.getPieces[id].position + (9 * (cr.getMoves + 1))) === 1) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
};

const southWest = (id,chessGame) => {
  let cr = compassRose();
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(chessGame.getPieces[id].position + (7 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (chessGame.getPieces[cr.getLocation].piece.charAt(0) != chessGame.getColorPlaying.charAt(0)) {
        let pieceCode = chessGame.getPieces[cr.getLocation].piece.slice(chessGame.getPieces[cr.getLocation].piece.length - 2);
        if ((['en','op'].includes(pieceCode) && [0,1].includes(id)) || (pieceCode === 'ng' && cr.getMoves === 0)) {
          chessGame.setCheck = true;
        }
        cr.setResultInc = chessGame.getPieces[id].position + (7 * (cr.getMoves + 1));
        cr.setNoMoreMoves = true; }
      if (cr.getMoves === 0){ cr.setResult = chessGame.getPieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = chessGame.getPieces[id].position + (7 * (cr.getMoves + 1)); }
    if (chessGame.getPieces[id].position + (7 * (cr.getMoves + 1)) > 63  || getX(chessGame.getPieces[id].position + (7 * (cr.getMoves + 1))) === 8) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
};

const stateOne = (chessGame) => {
  chessGame.setGameState = 1;
  boardRefresh(chessGame);
  let instructionMessage = '';
  if (inCheck(chessGame)) {
    chessGame.setCheck = true;
    instructionMessage = 'You are in check!!!\r\n'
  }
  instructionMessage += 'What piece would you like to move?  Press button to end game';
  document.getElementById('instructionMessage').setAttribute('style', 'white-space: pre;');
  document.getElementById('instructionMessage').textContent = instructionMessage
  actionButton.textContent = 'Concede Game'
  actionButton.removeEventListener("click", stateOneBound);
  actionButton.removeEventListener("click", changePlayersBound);
  actionButton.addEventListener("click", stateFourBound);
};

const stateTwo = (move, chessGame) => {
  chessGame.setGameState = 2;
  chessGame.setMovesAvailable = move.slice(1);
  chessGame.setChosenPiece = move[0];
  instructionMessage.textContent = `Where would you like to move? \r\n Press button too select another piece.`;
  actionButton.textContent = 'Go Back'
  actionButton.removeEventListener("click", stateFourBound);
  actionButton.addEventListener("click", stateOneBound);
  boardRefresh(chessGame);
};

const stateThree = (chessGame) => {
  chessGame.setGameState = 3;
  instructionMessage.textContent = `Press button to end turn.`;
  actionButton.textContent = 'End Turn'
  actionButton.removeEventListener("click", stateOneBound);
  actionButton.addEventListener("click", changePlayersBound);
};

const stateFour = (player) => {
  chessGame.setGameState = 4;
  instructionMessage.textContent = `${player} player lost by conceding. \r\n It is wise to know your limitations, and folly not to push the envelope.\r\n Reload to play again.`;
  actionButton.style.visibility = "hidden";
};

const west = (id,chessGame) => {
  let cr = compassRose();
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(chessGame.getPieces[id].position - (1 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (chessGame.getPieces[cr.getLocation].piece.charAt(0) != chessGame.getColorPlaying.charAt(0)) {
        let pieceCode = chessGame.getPieces[cr.getLocation].piece.slice(chessGame.getPieces[cr.getLocation].piece.length - 2);
        if ((['en','ok'].includes(pieceCode) && [0,1].includes(id)) || (pieceCode === 'ng' && cr.getMoves === 0)) {
          chessGame.setCheck = true;
        }
        cr.setResultInc = chessGame.getPieces[id].position - (1 * (cr.getMoves + 1));
        cr.setNoMoreMoves = true; }
      if (cr.getMoves === 0){ cr.setResult = chessGame.getPieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = chessGame.getPieces[id].position - (1 * (cr.getMoves + 1)); }
    if (chessGame.getPieces[id].position - (1 * (cr.getMoves + 1)) < 0 || getX(chessGame.getPieces[id].position - (1 * (cr.getMoves + 1))) === 8 ) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
};

let chessGame = game;
boardRefresh(chessGame);
const actionButton = document.getElementById('actionButton');
const instructionMessage = document.getElementById('instructionMessage');
const promotionForm = document.getElementById('promotionOption');
const promotionBound = pawnPromotion.bind(null, chessGame, promotionForm);
promotionForm.addEventListener("change", promotionBound);
instructionMessage.textContent = 'Press start to play.';
const stateOneBound = stateOne.bind(null, chessGame);
const stateFourBound = stateFour.bind(null, chessGame.getColorPlaying);
const changePlayersBound = changePlayers.bind(null, chessGame);
actionButton.addEventListener("click", stateOneBound);