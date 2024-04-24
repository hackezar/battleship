import { createBoard } from "./ship";

export const playerProto = {
    
};

export function createPlayer(type) {
    let player = Object.create(playerProto);
    player.type = type;
    let gameboard = createBoard();
    gameboard.createSquares();
    player.board = gameboard;
    return player;
}