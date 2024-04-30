import { createBoard } from "./ship";

export const playerProto = {
    
};

export function createPlayer(type, name, number) {
    let player = Object.create(playerProto);
    player.name = name;
    player.type = type;
    let gameboard = createBoard();
    gameboard.createSquares();
    player.board = gameboard;
    player.turn = false;
    player.winner = false;
    player.number = number;
    player.shipPlace = 'Vertical';
    player.shipToPlace = {};
    return player;
}