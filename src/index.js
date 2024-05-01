import _ from "lodash";
// stylesheets
import "./style.css";
import './homePage.css';

import { createBoard } from "./ship.js";
import {homepageDom, squareEventlistener }from "./dom.js";
import { buildHeaderandFooterDom, makeBoardDom, startGame } from "./app.js";
import { createPlayer } from "./player.js";

import { whosTurn } from "./app.js";

import { checkForComputerMove } from "./computerAI.js";

//ship placement screen imports
import { shipPlacementSetup } from "./shipPlacement.js";


//Otherwise go to homepage setup
homepageDom();

// The game is then started from a continue button in shipPlacementSetup\
// once all the ships have been set
