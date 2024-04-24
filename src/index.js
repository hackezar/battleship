import _ from "lodash";
// stylesheets
import "./style.css";
import './homePage.css';

import { createBoard } from "./ship";
import homepageDom from "./dom";
// start game function
import { startGame } from './app';


let Gameboard = createBoard();
// create the boards for the 2 players
Gameboard.createSquares();
Gameboard.placeShip(3, 'left', 2, 2, 'vert', 'Submarine');
Gameboard.placeShip(5, 'left', 0, 9, 'hori', 'Aircraft Carrier');
Gameboard.placeShip(4, 'left', 8, 4, 'vert', 'Battleship');
Gameboard.placeShip(3, 'left', 5, 5, 'hori', 'Destroyer');
Gameboard.placeShip(2, 'left', 0, 6, 'hori', 'Patrol boat');
console.log(Gameboard);

homepageDom();

// Skips right to the actual game page
window.location.href = './app.html';
startGame();