import _ from "lodash";
// stylesheets
import "./style.css";
import './homePage.css';

import { createBoard } from "./ship.js";
import {homepageDom, squareEventlistener }from "./dom.js";
import { buildBoardDom } from "./app.js";
import { createPlayer } from "./player.js";

import { whosTurn } from "./app.js";

homepageDom();



let Gameboard1 = createBoard();
let Gameboard2 = createBoard();
// create the boards for the 2 players
// player1
Gameboard1.createSquares();
let Player1 = createPlayer('human', 'Jack');
Player1.board.placeShip(3, 2, 2, 'vert', 'Submarine');
Player1.board.placeShip(5, 0, 9, 'hori', 'Aircraft Carrier');
Player1.board.placeShip(4, 8, 4, 'vert', 'Battleship');
Player1.board.placeShip(3, 5, 5, 'hori', 'Destroyer');
Player1.board.placeShip(2, 0, 6, 'hori', 'Patrol boat');



// player2
Gameboard2.createSquares();
let Player2 = createPlayer('human', 'Jim Bob');
Player2.board.placeShip(3, 2, 2, 'vert', 'Submarine');
Player2.board.placeShip(5, 0, 9, 'hori', 'Aircraft Carrier');
Player2.board.placeShip(4, 8, 4, 'vert', 'Battleship');
Player2.board.placeShip(3, 5, 5, 'hori', 'Destroyer');
Player2.board.placeShip(2, 0, 6, 'hori', 'Patrol boat');

// Skips right to the actual game page
function simulatePlayButtonClick(Player1, Player2) {
    document.body.innerHTML = "";
    buildBoardDom(Player1, Player2);
};
simulatePlayButtonClick(Player1, Player2);
//
whosTurn(Player1, Player2);
squareEventlistener(Player1, Player2);

