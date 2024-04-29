import { squareEventlistener, displayGameOverDom } from "./dom";
import { testMoveInHitOrMissList, checkGameOver, shipSunkData, getHitCoords, makeBoardDom, whosTurn } from "./app";

export function makeRandomPick(Computer, Player) {
    while(Computer.turn == true) {
        let randomX = Math.floor(Math.random() * 10);
        let randomY = Math.floor(Math.random() * 10);
        // make sure random coords are not in the hit or miss arrays
        if (testMoveInHitOrMissList(randomX, randomY, Computer) == false) {
            Player.board.receiveAttack(randomX, randomY, Computer);
            // switch turn variables after move has been made
            Computer.turn = false;
            Player.turn = true;
            checkGameOver(Computer);
            whosTurn(Player, Computer);
            makeBoardDom(Player);
            squareEventlistener(Player, Computer); 
            return Player, Computer;
        } else if (testMoveInHitOrMissList(randomX, randomY, Computer) == true) {
            makeRandomPick(Computer, Player);
        }
    }
}

export function randomNear(randomPick, moveX, moveY, Computer, count=0) {
    if (count == 4)
        return undefined;
    switch (randomPick) {
        case 0:
            moveX++;
            break;
        case 1:
            moveX--;
            break;
        case 2:
            moveY++;
            break;
        case 3:
            moveY--;
            break;
    }
    // make sure the predicted move is not in the hit or missed shots array
    if (testMoveInHitOrMissList(moveX, moveY, Computer) == false) {
        let move = [];
        move.push(moveX);
        move.push(moveY);
        return move;
    } else {
        randomPick++;
        if (randomPick > 3) {
            randomPick = 0;
        }
        randomNear(randomPick, moveX, moveY, Computer, count + 1);
    }

}

export function computerMove(Computer, Player) {
    console.log(Computer, Player);
    // If the Computer has already hit a ship,
    // iterate throught the hit shots array
    let i=0;
    // while i is the length of shipsonOppoenent board array
    while (i < 5) {
        // If the ship is not yet sunk
        if (Computer.board.shipsOnOpponentBoard[i].sunk == false){
            // and ship has been previously hit,
            if (Computer.board.shipsOnOpponentBoard[i].xHits.length >= 1){
                // iterate through xHits
                for (let j=0; j < Computer.board.shipsOnOpponentBoard[i].xHits.length; j++) {
                    // random number between 0 and 3 for randomNear switch function
                    let randomPick = Math.floor(Math.random() * 4);
                    // get x and y hit coord for this iteration
                    let moveX = Computer.board.shipsOnOpponentBoard[i].xHits[j];
                    let moveY = Computer.board.shipsOnOpponentBoard[i].yHits[j];
                    //randomly pick an adjacent square to xHits[i], yHits[i]
                    let move = randomNear(randomPick, moveX, moveY, Computer);
                    console.log(move);
                    // If random near could not get a number
                    // make sure move is defined
                    if (move != undefined) {
                        // Make sure the move is on the board
                        if (move[0] <= 9 && move[0] >=0 && move[1] <= 9 && move[1] >= 0 && move != undefined) {
                            Player.board.receiveAttack(move[0], move[1], Computer);
                            // Switch whos turn it is
                            Computer.turn = false;
                            Player.turn = true;
                            checkGameOver(Computer);
                            whosTurn(Player, Computer);
                            makeBoardDom(Player);
                            squareEventlistener(Player, Computer);
                            // break while loop
                            return;
                        }
                    }
                }
            }
        }
        i++;
    }
    //Otherwise, randomly pick a square, if was above previously
    // as long as its not in the missed shots
    // If the computer still hasnt made a turn, randomly pick a square
    if (Computer.turn == true){
        makeRandomPick(Computer, Player);
    }
    return Computer, Player;
}
export function checkForComputerMove(Computer, Player) {
    // Check that its the computers turn
    if (Computer.turn == true)  {
        // Check that player is of type computer
        if (Computer.type = 'computer') {
            computerMove(Computer, Player);
        }
    }
    else
        return;
}