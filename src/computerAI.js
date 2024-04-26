import { makeBoardDom, whosTurn } from "./app";
import { squareEventlistener } from "./dom";
import { testMoveInHitOrMissList } from "./app";

export function computerMove(Computer, Player) {
    // Check that the player is a computer type
    if (Computer.type == 'computer') {
        console.log(Computer);
    // If the Computer has already hit a ship,
    // iterate throught the hit shots array
        if (Computer.board.hitShips.length > 0){
            console.log(Computer.board.hitShips);
            for (let i=0; i<Computer.board.hitShips.length; i++) {
                    // If the ship has been previously hit,
                    // and it is not yet sunk
                    if (Computer.board.hitShips[i].sunk == false){
                        while (Computer.turn == true) {
                            // check if adjacent squares are on the board
                            let randomPick = Math.floor(Math.random() * 4);
                            let moveX, moveY;
                            // Randomly check if the squares above, below
                            // left and right are valid squares
                            switch (randomPick) {
                                case 0:
                                    moveX = (Computer.board.hitShips[i].x) + 1;
                                    moveY = Computer.board.hitShips[i].y;
                                    break;
                                case 1:
                                    moveX = (Computer.board.hitShips[i].x) - 1;
                                    moveY = Computer.board.hitShips[i].y;
                                    break;
                                case 2:
                                    moveX = Computer.board.hitShips[i].x;
                                    moveY = (Computer.board.hitShips[i].y) + 1;
                                    break;
                                case 3:
                                    moveX = Computer.board.hitShips[i].x;
                                    moveY = (Computer.board.hitShips[i].y) - 1;
                                    break;
                            }
                            // make sure the predicted move is not in the hit or missed shots array
                            console.log(testMoveInHitOrMissList(moveX, moveY, Computer));
                            if (testMoveInHitOrMissList(moveX, moveY, Computer) == false) {
                                // Make sure the move is on the board
                                if (moveX <= 9 && moveX >=0 && moveY <= 9 && moveY >= 0) {
                                    //Make sure the move is not a already hit or missed square
                                    if (Computer.board.checkMissedShots(moveX, moveY) == false && Computer.board.checkHitShots(moveX, moveY) == false) {
                                        console.log(moveX, moveY);
                                        Player.board.receiveAttack(moveX, moveY, Computer);
                                        // Switch whos turn it is
                                        Computer.turn = false;
                                        Player.turn = true;
                                        whosTurn(Player, Computer);
                                        makeBoardDom(Player);
                                        squareEventlistener(Player, Computer);
                                    }
                                }
                            }
                        }
                    }
            }
        }
    //Otherwise, randomly pick a square
    // as long as its not in the missed shots
        else {
            while(Computer.turn == true) {
                let randomX = Math.floor(Math.random() * 10);
                let randomY = Math.floor(Math.random() * 10);
                console.log(Computer.board.hitShips);
                if (Computer.board.checkMissedShots(randomX, randomY) == false) {
                    console.log(randomX, randomY);
                    Player.board.receiveAttack(randomX, randomY, Computer);
                    // switch turn variables after move has been made
                    Computer.turn = false;
                    Player.turn = true;
                    whosTurn(Player, Computer);
                    makeBoardDom(Player);
                    squareEventlistener(Player, Computer); 
                }
            }
        }
    }
    return Computer, Player;
}
export function checkForComputerMove(Computer, Player) {
    if (Computer.turn == true) 
        computerMove(Computer, Player);
    else
        return;
}