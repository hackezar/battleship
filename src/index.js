import _ from "lodash";
import "./style.css";

import { createBoard, createShip } from "./ship";


let Gameboard = createBoard();
// create the boards for the 2 players
Gameboard.createSquares();
Gameboard.placeShip(3, 'left', 2, 2, 'vert');
Gameboard.placeShip(5, 'left', 0, 9, 'hori');
Gameboard.placeShip(4, 'left', 8, 4, 'vert');
Gameboard.placeShip(3, 'left', 5, 5, 'hori');
Gameboard.placeShip(2, 'left', 0, 6, 'hori');
console.log(Gameboard);
Gameboard.placeShip(3, 'left', -1, 11);
