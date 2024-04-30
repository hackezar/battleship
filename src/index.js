import _ from "lodash";
// stylesheets
import "./style.css";
import './homePage.css';

import { createBoard } from "./ship.js";
import {homepageDom, squareEventlistener }from "./dom.js";
import { buildHeaderandFooterDom, makeBoardDom } from "./app.js";
import { createPlayer } from "./player.js";

import { whosTurn } from "./app.js";

import { checkForComputerMove } from "./computerAI.js";

//ship placement screen imports
import { shipPlacementSetup } from "./shipPlacement.js";
homepageDom();



let Gameboard1 = createBoard();
// create the boards for the 2 players
// player1
Gameboard1.createSquares();
let Player1 = createPlayer('human', 'Jack', 1);

// Go to ship placement screen for player1
shipPlacementSetup(Player1)

// The game is started from a continue button in shipPlacementSetup
// once all the ships have been set




// Skips right to the actual game page
/*
function simulatePlayButtonClick(Player1, Player2) {
    document.body.innerHTML = "";
    buildHeaderandFooterDom(Player1, Player2);
    makeBoardDom(whosTurn(Player1, Player2));
};
simulatePlayButtonClick(Player1, Player2);
//
whosTurn(Player1, Player2);
squareEventlistener(Player1, Player2);
if (Player1.type == 'computer') 
    checkForComputerMove(Player1, Player2);
else if (Player2.type == 'computer')
    checkForComputerMove(Player2, Player1);
*/
