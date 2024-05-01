// Radio icons
import HumanPic from './icons/human.svg';
import ComputerPic from './icons/robot.svg';
import { whosTurn, checkForHitOrMiss, testMoveInHitOrMissList, checkGameOver } from './app';
import { createPlayer } from './player';
import { shipPlacementSetup } from './shipPlacement';
// Hit Icon
import Hit from './icons/nuclear-explosion.png';
// Miss icon
import Miss from './icons/water-splash.png';

// pictures
import Game from './pics/battleship-game.jpg';
import Battle from './pics/battleship-real.jpg';

// start game function
import { buildHeaderandFooterDom, makeBoardDom } from './app';
import { checkForComputerMove } from './computerAI';
import { createBoard } from './ship';

export function homepageDom() {
    // Add Icon images
    const humanPic = document.getElementsByClassName('humanPic');
    for (let i=0; i<humanPic.length; i++)
        humanPic[i].src = HumanPic;
    const computerPic = document.getElementsByClassName('computerPic');
    for (let i=0; i<computerPic.length; i++)
        computerPic[i].src = ComputerPic;

    // Add pictures
    document.getElementById('topPic').src = Game;
    document.getElementById('bottomPic').src = Battle;

    // Make radio divs entirely clickable
    let pvp = document.getElementById('pvpDiv');
    pvp.addEventListener('click', () => {
        document.getElementById('human').checked = true;
        document.getElementById('pvpForm').setAttribute('class', 'form hidden');
        document.getElementById('pveForm').setAttribute('class', 'form');
    })
    let pve = document.getElementById('pveDiv');
    pve.addEventListener('click', () => {
        document.getElementById('computer').checked = true;
        document.getElementById('pveForm').setAttribute('class', 'form hidden');
        document.getElementById('pvpForm').setAttribute('class', 'form');
    });

    // onclick for start game button
    let playButton = document.getElementById('playButton');
    playButton.addEventListener('click', () => {
        let player1Name = document.getElementById('playerNameInput').value;
        let player1Type = "human";
        let Gameboard1 = createBoard();
        Gameboard1.createSquares();
        window.player1 = createPlayer(player1Type, player1Name, 1);
        if (document.getElementById('computer').checked == true){
            let name = document.getElementById('playerNameInput2').value
            let Gameboard2 = createBoard();
            Gameboard2.createSquares();
            window.player2 = createPlayer('computer', name, 2);
        } else if (document.getElementById('human').checked == true){
            let name = document.getElementById('playerNameInput2').value
            let Gameboard2 = createBoard();
            Gameboard2.createSquares();
            window.player2 = createPlayer('human', name, 2); 
        }
        document.body.innerHTML = "";
        shipPlacementSetup(window.player1, window.player2);
    })
}

export function addHitIcon(square) {
    let newIcon = document.createElement('img');
    newIcon.classList.add('hitIcon');
    newIcon.src = Hit;
    square.appendChild(newIcon);
}

export function addNextButton(Player1, Player2) {
    // Remove turnOutput
    document.getElementById('turnOutput').innerHTML = `Click "Next Turn" button for next turn`;
    let header = document.getElementById('headerId');
    let nextBtn = document.createElement('btn');
    nextBtn.classList.add('nextBtn');
    nextBtn.setAttribute('id', 'nextBtn');
    nextBtn.innerHTML = 'Next Turn';
    nextBtn.addEventListener('click', () => {
        // remove next button
        nextBtn.remove();
        // dont execute below until next button is clicked
        whosTurn(Player1, Player2);
        if (Player1.turn == true){
            makeBoardDom(Player1);
            squareEventlistener(Player1, Player2);
        } else if (Player2.turn == true){
            makeBoardDom(Player2);
            if (Player2.type == 'computer')
                checkForComputerMove(Player1, Player2);
            else if (Player2.type == 'human')
                squareEventlistener(Player1, Player2);
        }

        checkForComputerMove(Player1, Player2);   
    })
    header.insertBefore(nextBtn, document.getElementById('player2score'));
}

export function updateShipsLeft(Attacker) {
    let count=0;
    for (let i=0; i<Attacker.board.shipsOnOpponentBoard.length; i++) {
        if (Attacker.board.shipsOnOpponentBoard[i].sunk == false) {
            count++
        }
    }
    if (Attacker.number == 1) {
        let player2 = document.getElementById('score2Ships');
        player2.innerHTML = `Ships left: ${count}`;
    } else if (Attacker.number == 2) {
        let player1 = document.getElementById('score1Ships');
        player1.innerHTML = `Ships left: ${count}`;
    }
}

export function squareEventlistener(Player1, Player2) {
    let layout = document.getElementById('layout');
    let clone = layout.cloneNode(true);
    layout.replaceWith(clone);

    for (let i=0; i<10; i++) {
        for (let j=0; j<10; j++) {
            if (Player1.turn == true) {
                document.getElementById(`${i}, ${j}`).addEventListener('click', () => {
                    // make sure the square hasnt been attacked before
                    if (testMoveInHitOrMissList(i, j, Player1) == true){
                        let output = document.getElementById('turnMessage');
                        output.innerHTML = "";
                        output.innerHTML = `${Player1.name}, you have already attacked (${i}, ${j}) before`;
                        return;
                    }
                    // Coordinate will be checked if a ship is there on button click
                    Player2.board.receiveAttack(i, j, Player1);
                    updateShipsLeft(Player1);
                    // Switch turn variables after move has been made
                    Player2.turn = true;
                    Player1.turn = false;
                    checkGameOver(Player1);
                    addNextButton(Player1, Player2);
                })
            } else if (Player2.turn == true) {
                document.getElementById(`${i}, ${j}`).addEventListener('click', () => {
                    // make sure the square hasnt been attacked before
                    if (testMoveInHitOrMissList(i, j, Player2) == true){
                        let output = document.getElementById('turnMessage');
                        output.innerHTML = "";
                        output.innerHTML = `${Player2.name}, you have already attacked (${i}, ${j}) before`;
                        return;
                    }
                    Player1.board.receiveAttack(i, j, Player2);
                    updateShipsLeft(Player2);
                    // switch turn variables after turn has been made
                    Player1.turn = true;
                    Player2.turn = false;
                    checkGameOver(Player2);
                    addNextButton(Player1, Player2);
                });
            } else {
                throw new Error('No player has turn set to true');
            };
        }
    }
}   

export function displayHitOrMiss(xCord, yCord, Player, winLossMessage) {
    let textBox = document.getElementById('turnMessage');
    textBox.innerHTML = "";
    textBox.innerHTML = `${Player.name} attacks ${xCord}, ${yCord} ${winLossMessage}`;
}

export function displayGameOverDom(Player1, Player2) {
    let Winner;
    let Loser;
    if (Player1.winner == true && Player2.winner == true)
        throw new Error('Both Players are declared winners')
    else if (Player1.winner = true)
        Winner = Player1, Loser = Player2;
    else if (Player2.winner = true)
        Winner = Player2, Loser = Player1;
    else
        throw new Error('No winner is declared');

    let message = document.getElementById('turnMessage');
    message.innerHTML = "";
    message.innerHTML = `${Winner.name} defeats ${Loser.name}!`;
}
export function getShipsLeft(Player) {
    let count=0;
    for (let i=0; i<Player.board.shipsOnOpponentBoard.length; i++) {
        if (Player.board.shipsOnOpponentBoard[i].sunk == false) {
            count++;
        }
    }
    return "Ships left: " + count;
}