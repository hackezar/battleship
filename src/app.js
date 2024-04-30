import { random } from "lodash";
import { addHitIcon, getShipsLeft } from "./dom";


import Hit from './icons/nuclear-explosion.png';
import Miss from './icons/water-splash.png';
import { checkForComputerMove } from "./computerAI";

export function buildHeaderandFooterDom(Player1, Player2) {
    // layout
    let layout = document.createElement('div');
    layout.setAttribute('id', 'layout');
    document.body.appendChild(layout);
    // Header
    let header = document.createElement('div');
    let score1 = document.createElement('div');
    let score1Name = document.createElement('div');
    score1Name.setAttribute('id', 'score1Name');
    score1Name.innerHTML = Player1.name;
    let score1Ships = document.createElement('div');
    score1Ships.innerHTML = getShipsLeft(Player2);
    score1Ships.setAttribute('id', 'score1Ships');
    let score2 = document.createElement('div');
    let score2Name = document.createElement('div');
    score2Name.setAttribute('id', 'score2Name');
    score2Name.innerHTML = Player2.name;
    let score2Ships = document.createElement('div');
    score2Ships.setAttribute('id', 'score2Ships');
    score2Ships.innerHTML = getShipsLeft(Player1);
    header.setAttribute('class', 'header');
    header.setAttribute('id', 'headerId');
    score1.setAttribute('id', 'player1score');
    score1.classList.add('scoreHeader');
    score2.setAttribute('id', 'player2score');
    score2.classList.add('scoreHeader');  
    score1.appendChild(score1Name);
    score1.appendChild(score1Ships);  
    header.appendChild(score1);
    score2.appendChild(score2Name);
    score2.appendChild(score2Ships);
    header.appendChild(score2);
    layout.appendChild(header);

    // Container
    let container = document.createElement('div');
    container.setAttribute('id', 'boardContainer');
    layout.appendChild(container);

    // footer
    let footer = document.createElement('div');
    footer.setAttribute('id', 'footer');
    // turn message
    let turnMessage = document.createElement('div');
    turnMessage.setAttribute('id', 'turnMessage');
    turnMessage.classList.add('footerMessage');
    footer.appendChild(turnMessage);
    // previous move message
    let turnOutput = document.createElement('div');
    turnOutput.setAttribute('id', 'turnOutput');
    turnOutput.classList.add('footerMessage');
    footer.appendChild(turnOutput);
    layout.appendChild(footer);
}

export function checkForHitOrMiss(Player) {
    for (let i=0; i<Player.board.board.length; i++) {
        for (let j=0; j<Player.board.hitShots.length; j++)
        if (Player.board.board[i].x == Player.board.hitShots[j][0] && Player.board.board[i].y == Player.board.hitShots[j][1]) {
            let squareX = Player.board.board[i].x;
            let squareY = Player.board.board[i].y;
            let square = document.getElementById(`${squareX}, ${squareY}`);
            square.innerHTML = "";
            let newIcon = document.createElement('img');
            newIcon.src = Hit;
            newIcon.classList.add('hitIcon');
            square.appendChild(newIcon);
        }
        for (let j = 0; j<Player.board.missedShots.length; j++) {
            if (Player.board.board[i].x == Player.board.missedShots[j][0] && Player.board.board[i].y == Player.board.missedShots[j][1]) {
                let squareX = Player.board.board[i].x;
                let squareY = Player.board.board[i].y;
                let square = document.getElementById(`${squareX}, ${squareY}`);
                square.innerHTML = "";
                let newIcon = document.createElement('img');
                newIcon.src = Miss;
                newIcon.classList.add('hitIcon');
                square.appendChild(newIcon);
            }
        } 
    }  
};

export function makeBoardDom(Player) {
    let container = document.getElementById('boardContainer');
    container.innerHTML = "";
    for (let i=0; i< 10; i++) {
        for (let j=0; j<10; j++) {
            const node = document.createElement('div');
            node.classList.add('grid-cell');
            node.setAttribute('id', `${i}, ${j}`);
            node.innerHTML = `${i} , ${j}`
            // event listener for square
            container.appendChild(node);
        }
    }
    checkForHitOrMiss(Player);
}

export function whosTurn(Player1, Player2) {
    if (Player1.turn == true) {
        document.getElementById('player1score').classList.add('yourTurn');
        document.getElementById('player2score').classList.remove('yourTurn');
        document.getElementById('turnOutput').innerHTML = `${Player1.name}'s Turn! Make your pick.`
    } else if (Player2.turn == true) {
        document.getElementById('player2score').classList.add('yourTurn');
        document.getElementById('player1score').classList.remove('yourTurn');
        document.getElementById('turnOutput').innerHTML = `${Player2.name}'s Turn! Make your pick.`
    } else {
        let random = Math.floor(Math.random() * 2);
        if (random == 0) {
            Player1.turn = true;
            Player2.turn = false;
            document.getElementById('player1score').classList.add('yourTurn');
            document.getElementById('player2score').classList.remove('yourTurn');
            document.getElementById('turnOutput').innerHTML = `${Player1.name}'s Turn! Make your pick.`
            return Player1;
        }
        else if (random == 1) {
            Player2.turn = true;
            Player1.turn = false;
            document.getElementById('player2score').classList.add('yourTurn');
            document.getElementById('player1score').classList.remove('yourTurn');
            document.getElementById('turnOutput').innerHTML = `${Player2.name}'s Turn! Make your pick.`
            return Player2;
        }
    }
}

export function testMoveInHitOrMissList(moveX, moveY, Computer) {
    console.log(Computer.board.hitShots);
    console.log(Computer.board.missedShots);
    // See if in hitShots
    if (Computer.board.hitShots.length > 0) {
        for (let i=0; i<Computer.board.hitShots.length; i++) {
            if (Computer.board.hitShots[i][0] == moveX && Computer.board.hitShots[i][1] == moveY)
                return true;
        }

    }        
    // See if in missed shots
    if (Computer.board.missedShots.length > 0) {
        for (let i=0; i<Computer.board.missedShots.length; i++) {
            if (Computer.board.missedShots[i][0] == moveX && Computer.board.missedShots[i][1] == moveY) 
                return true;  
        }
    }
    return false; 
}

export function isSunk(AttackingPlayer, shipTitle) {
        for (let i=0; i<AttackingPlayer.board.shipsOnOpponentBoard.length; i++) {
            // Find ship that has been hit in the shipsonopponentboard array
            if (AttackingPlayer.board.shipsOnOpponentBoard[i].title == shipTitle) {
                // See if ship is sunk
                if (AttackingPlayer.board.shipsOnOpponentBoard[i].hits >= AttackingPlayer.board.shipsOnOpponentBoard[i].length) {
                    // mark ship as sunk
                    AttackingPlayer.board.shipsOnOpponentBoard[i].sunk = true;
                    // Send message that ship has been sunk
                    let turnMessage = document.getElementById('turnMessage');
                    turnMessage.innerHTML = "";
                    turnMessage.innerHTML = `${AttackingPlayer.name} sinks the enemy's ${shipTitle}!`;
                    return;
                }
            }
        } 
}

export function getHitCoords(shipsOnBoard) {
    for (let i=0; i<shipsOnBoard.length; i++) {
        if (shipsOnBoard[i].hits > 0) {
                let randomIndex = Math.floor(Math.random() * (shipsOnBoard[i].xHits.length - 1));
                let randomX = shipsOnBoard[i].xHits[randomIndex];
                let randomY = shipsOnBoard[i].yHits[randomIndex];
                let move = [randomX, randomY]
                return move
        }
    }
}

export function checkGameOver(Player) {
    // Check if the game is over
    for (let i=0; i<Player.board.shipsOnOpponentBoard.length; i++) {
        if (Player.board.shipsOnOpponentBoard[i].sunk == false)
            return false;
    }         
    console.log("The Computer Wins!");
    Player.winner = true;
    displayGameOverDom(Player);
    return;
    }
    
export function shipSunkData(Player, shipName) {
    for (let i=0; i<Player.board.shipsOnOpponentBoard.length; i++) {
        if (Player.board.shipsOnOpponentBoard[i].title == shipName) {
            //Test if ship is sunk
            if (Player.board.shipsOnOpponentBoard[i].sunk == false)
                return false;
            else if (Player.board.shipsOnOpponentBoard[i].sunk == true)
                return true;
            else
                throw new Error('ship sunk error');            
        }
    }
}

export function startGame(Player1, Player2){
    document.body.innerHTML = "";
    buildHeaderandFooterDom(Player1, Player2);
    //makeBoardDom(whosTurn(Player1, Player2));
}