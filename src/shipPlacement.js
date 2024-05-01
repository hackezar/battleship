import Boat from "./icons/boat.svg";
import Rotate from './icons/rotate.svg';
import { createPlayer } from "./player";
import { createBoard } from "./ship";

import { placeComputerShips } from "./computerAI";
import { startGame } from "./app";

export function shipPlacementSetup(Player) {
    document.body.innerHTML = "";
    let container = document.createElement('div');
    container.setAttribute('id', 'shipSetupContainer');
    let boardContainer = document.createElement('div');
    boardContainer.setAttribute('id', 'boardContainer');
    boardContainer.classList.add('shipSetup');
    let header = document.createElement('div');
    header.setAttribute('id', 'setupHeader');
    let rotateDiv = document.createElement('div');
    rotateDiv.setAttribute('id', 'rotateDiv');
    rotateDiv.addEventListener('click', () => {
        if (Player.shipPlace == 'Vertical'){
            Player.shipPlace = 'Horizontal';
            document.getElementById('rotateMessage').innerHTML = `Current Orientation: ${Player.shipPlace}` 
            renderGhostShips(Player);
            return Player
        }
        else if(Player.shipPlace == 'Horizontal'){
            Player.shipPlace = 'Vertical';
            document.getElementById('rotateMessage').innerHTML = `Current Orientation: ${Player.shipPlace}`
            renderGhostShips(Player);
            return Player;
        }
    });
    let rotateMessage = document.createElement('div');
    rotateMessage.setAttribute('id', 'rotateMessage');
    rotateMessage.innerHTML = `Current Orientation: ${Player.shipPlace}`
    let rotateImg = document.createElement('img');
    rotateImg.src = Rotate;
    rotateImg.setAttribute('id', 'rotateIcon');
    rotateDiv.appendChild(rotateMessage);
    rotateDiv.appendChild(rotateImg);
    let shipMessage = document.createElement('div');
    shipMessage.setAttribute('id', 'shipMessage');
    header.appendChild(shipMessage);
    header.appendChild(rotateDiv);
    //footer
    let footer = document.createElement('div');
    footer.setAttribute('id', 'shipPlaceFooter');
    container.appendChild(header);
    container.appendChild(boardContainer);
    container.appendChild(footer);
    document.body.appendChild(container);

    makeSetupBoardDom(Player);
    displayCurrentShip(Player);
}

export function checkAllShipsPlaced(Player) {
    if (Player.board.shipsOnBoard.length == 5) {
        removeSquareListeners(Player);
        renderContinueDom(Player);
        return true;
    }
    else    
        return false;
}

export function placeShipListener() {
    console.log(window.player);
    let xCoord = this.id.slice(0, 1);
    let yCoord = this.id.slice(3, 4);
    let length = window.player.shipToPlace.length;
    let title = window.player.shipToPlace.title;
    let orientation = window.player.shipPlace;
    window.player.board.placeShip(length, xCoord, yCoord, orientation, title);
    if (checkAllShipsPlaced(window.player) == false){
        displayCurrentShip(window.player);
        renderGhostShips(window.player);
    } else {
        console.log("all Ships placed");
    }
}

export function isShipPlaced(Player, name) {
    console.log(Player);
    if (Player.board.shipsOnBoard.length == 0)
        return false;
    for (let i=0; i<Player.board.shipsOnBoard.length; i++){
        if (Player.board.shipsOnBoard[i].title == name)
            return true;
    }
    return false;
}

export function selectAShipToPlace(Opponent, i=0) {
    let ship = {};
        switch(i) {
            case 0:
                if (isShipPlaced(Opponent, 'Battleship') == false){
                    ship.title = 'Battleship';
                    ship.length = 4;
                    break;
                } else {
                    i++;
                    selectAShipToPlace(Opponent, i);
                }
            case 1:
                if (isShipPlaced(Opponent, 'Destroyer') == false){
                    ship.title = 'Destroyer';
                    ship.length = 3;
                    break;
                } else {
                    i++;
                    selectAShipToPlace(Opponent, i);
                }
            case 2:
                if (isShipPlaced(Opponent, 'Submarine') == false){
                    ship.title = 'Submarine';
                    ship.length = 3;
                    break;
                } else {
                    i++;
                    selectAShipToPlace(Opponent, i);
                }
            case 3:
                if (isShipPlaced(Opponent, 'Aircraft Carrier') == false){
                    ship.title = 'Aircraft Carrier';
                    ship.length = 5;
                    break;
                } else {
                    i++;
                    selectAShipToPlace(Opponent, i);
                }
            case 4:
                if (isShipPlaced(Opponent, 'Patrol boat') == false){
                    ship.title = 'Patrol boat';
                    ship.length = 2;
                    break;
                } else {
                    console.log('all ships placed');
                    break;
                }
        }
        return ship;
}

export function displayCurrentShip(Player) {
    console.log(Player);
    let message = document.getElementById('shipMessage');
    if (Player.board.shipsOnBoard.length < 5) {
        Player.shipToPlace = selectAShipToPlace(Player);
        message.innerHTML = `Current Ship: ${Player.shipToPlace.title}.<br></br>Length: ${Player.shipToPlace.length}`;
    }
    renderGhostShips(Player);
}

export function addShipImg(i, j) {
    if (i > 9 || i<0 || j>9 || j<0) {
        return;
    }
    if (document.getElementById(`${i}, ${j}img` != undefined))
        return;
    let newImg = document.createElement('img');
    newImg.src = Boat;
    newImg.classList.add('shipIcon');
    newImg.setAttribute('id', `${i}, ${j}img`);
    document.getElementById(`${i}, ${j}`).innerHTML = "";
    document.getElementById(`${i}, ${j}`).appendChild(newImg);
}

export function removeShipImg(i, j) {
    if (i > 9 || i<0 || j>9 || j<0) {
        return;
    }
    let img = document.getElementById(`${i}, ${j}img`);
    if (img){
     img.remove();
    }
    document.getElementById(`${i}, ${j}`).innerHTML = `${i}, ${j}`;
}

export function verticalGhostShipsIn() {
    let length = window.player.shipToPlace.length;
    let xCoord = Number(this.id.slice(0, 1));
    let yCoord = Number(this.id.slice(3, 4));
    if ((xCoord + length - 1) > 9)
        return;
    while( length > 0) {
        // Make sure placed ship isnt included in this
        let index = window.player.board.getSquareIndex(xCoord, yCoord)
        if (window.player.board.board[index].occupied != false){
            return;
        }
        else {
        addShipImg(xCoord, yCoord);
        xCoord++;
        length--;
        }
    }
}

export function verticalGhostShipsOut() {
    let length = window.player.shipToPlace.length;
    let xCoord = Number(this.id.slice(0, 1));
    let yCoord = Number(this.id.slice(3, 4));
    // if ship placement goes off board, skip ghost ships
    if ((xCoord + length - 1) > 9)
        return;
    while (length > 0){
        // Make sure placed ship isnt removed
        let index = window.player.board.getSquareIndex(xCoord, yCoord);
        if (window.player.board.board[index].occupied != false) {
            return;
        } else {
        removeShipImg(xCoord, yCoord);
        xCoord++;
        length--;
        }
    }
}

export function horizontalGhostShipsIn() {
    let length = window.player.shipToPlace.length;
    let xCoord = Number(this.id.slice(0, 1));
    let yCoord = Number(this.id.slice(3, 4));
    // if ship placement goes off board, skip ghost ships
    if((yCoord + length - 1) > 9)
        return;
    while( length > 0) {
        // make sure placed ship isnt removed
        let index = window.player.board.getSquareIndex(xCoord, yCoord);
        if (window.player.board.board[index].occupied != false) {
            return;
        } else{
        addShipImg(xCoord, yCoord);
        yCoord++;
        length--;
        }
    }
}

export function horizontalGhostShipsOut() {
    let length = window.player.shipToPlace.length;
    let xCoord = Number(this.id.slice(0, 1));
    let yCoord = Number(this.id.slice(3, 4));
    // if ship placement goes off board, skip ghost ships
    if ((yCoord + length - 1) > 9)
        return;
    while (length > 0){
        // make sure placed ship isnt removed
        let index = window.player.board.getSquareIndex(xCoord, yCoord);
        if (window.player.board.board[index].occupied != false) {
            return;
        } else {
        removeShipImg(xCoord, yCoord);
        yCoord++;
        length--;
        }
    }
}

export function renderGhostShips(Player) {
    window.player = Player;
    for (let i=0; i<10; i++) {
        for (let j=0; j<10; j++) {
            let square = document.getElementById(`${i}, ${j}`);
            if (Player.shipPlace == "Vertical") {
                //Remove previous mouse listeners
                square.removeEventListener('mouseover', horizontalGhostShipsIn);
                square.removeEventListener('mouseout', horizontalGhostShipsOut);
                // add new mouse listeners
                square.addEventListener('mouseover', verticalGhostShipsIn);
                square.addEventListener('mouseout', verticalGhostShipsOut);
            } else if (Player.shipPlace == "Horizontal") {
                //Remove previous mouse listeners
                square.removeEventListener('mouseover', verticalGhostShipsIn);
                square.removeEventListener('mouseout', verticalGhostShipsOut);
                // add new mouse listeners
                square.addEventListener('mouseover', horizontalGhostShipsIn);
                square.addEventListener('mouseout', horizontalGhostShipsOut);
            }
        }
    }
}

export function removeSquareListeners() {
    for (let i=0; i<10; i++) {
        for(let j=0; j<10; j++) {
            let square = document.getElementById(`${i}, ${j}`);
            square.removeEventListener('mouseover', horizontalGhostShipsIn);
            square.removeEventListener('mouseout', horizontalGhostShipsOut);
            square.removeEventListener('mouseover', verticalGhostShipsIn);
            square.removeEventListener('mouseout', verticalGhostShipsOut);
            square.removeEventListener('click', placeShipListener);
        }
    }
}

export function makeSetupBoardDom(Player) {
    window.player = Player;
    console.log(Player);
    let container = document.getElementById('boardContainer');
    container.innerHTML = "";
    document
    for (let i=0; i< 10; i++) {
        for (let j=0; j<10; j++) {
            const node = document.createElement('div');
            node.classList.add('grid-cell');
            node.setAttribute('id', `${i}, ${j}`);
            node.innerHTML = `${i}, ${j}`
            node.removeEventListener('click', placeShipListener);
            node.addEventListener('click', placeShipListener);
            container.appendChild(node);
        }
    }
}

export function resetShipPlace() {
    //Same as the initial script in the index.js file
    let Gameboard1 = createBoard();
    let Gameboard2 = createBoard();

    Gameboard1.createSquares();
    let Player1 = createPlayer('human', 'Jack', 1);

    Gameboard2.createSquares();
    let Player2 = createPlayer('computer', 'Mr. Roboto', 2);

    if (Player1.type == 'human') {
    shipPlacementSetup(Player1, Player2);
    }
}

export function addShipsOnOpponentBoard(Player1, Player2){
    // Add for player1
    for (let i=0; i<Player2.board.shipsOnBoard.length; i++){
        Player1.board.shipsOnOpponentBoard.push(Player2.board.shipsOnBoard[i]);
    }
    window.player1 = Player1;

    // Add for player 2
    for (let i=0; i<Player1.board.shipsOnBoard.length; i++){
        Player2.board.shipsOnOpponentBoard.push(Player1.board.shipsOnBoard[i]);
    }
    window.player2 = Player2;
}

export function continueBtnListener() {
    window.player1.type = 'human';
    if (window.player1.board.shipsOnBoard.length == 5) {
        if (window.player2 == undefined) {
            // Create Player 2
            let Gameboard2 = createBoard();
            Gameboard2.createSquares();
            let Player2 = createPlayer('computer', 'Mr. Roboto', 2);
            // If player2 is a human, go to ship placement screen
            if (Player2.type == 'human')
                shipPlacementSetup(Player2);
            // if player2 is a computer, randomly place ships
            else
                placeComputerShips(Player2);
        }
        addShipsOnOpponentBoard(window.player1, window.player2);
        startGame(window.player1, window.player2);
    }
}

export function renderContinueDom(Player1, Player2) {
    window.player1 = Player1;
    window.player2 = Player2;
    let footer = document.getElementById('shipPlaceFooter');
    let continueBtn = document.createElement('btn');
    continueBtn.setAttribute('id', 'continueBtn');
    continueBtn.classList.add('shipSetupBtn');
    continueBtn.innerHTML = "Confirm Board";
    continueBtn.addEventListener('click', continueBtnListener)
    let restartBtn = document.createElement('btn');
    restartBtn.setAttribute('id', 'restartBtn');
    restartBtn.classList.add('shipSetupBtn')
    restartBtn.innerHTML = 'Reset Board';
    restartBtn.addEventListener('click', resetShipPlace);
    footer.appendChild(restartBtn);
    footer.appendChild(continueBtn);

}

