// Radio icons
import HumanPic from './icons/human.svg';
import ComputerPic from './icons/robot.svg';
import { whosTurn, checkForHitOrMiss } from './app';

// Hit Icon
import Hit from './icons/nuclear-explosion.png';
// Miss icon
import Miss from './icons/water-splash.png';

// start game function
import { buildHeaderandFooterDom, makeBoardDom } from './app';
import { checkForComputerMove } from './computerAI';

export function homepageDom() {
    // Add Icon images
    const humanPic = document.getElementsByClassName('humanPic');
    for (let i=0; i<humanPic.length; i++)
        humanPic[i].src = HumanPic;
    const computerPic = document.getElementsByClassName('computerPic');
    for (let i=0; i<computerPic.length; i++)
        computerPic[i].src = ComputerPic;

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
        document.body.innerHTML = "";
        buildBoardDom(Player1, Player2);
    })
}

export function addHitIcon(square) {
    let newIcon = document.createElement('img');
    newIcon.classList.add('hitIcon');
    newIcon.src = Hit;
    square.appendChild(newIcon);
}



export function squareEventlistener(Player1, Player2) {
    let layout = document.getElementById('layout');
    let clone = layout.cloneNode(true);
    layout.replaceWith(clone);

    for (let i=0; i<10; i++) {
        for (let j=0; j<10; j++) {
            if (Player1.turn == true) {
                document.getElementById(`${i}, ${j}`).addEventListener('click', () => {
                    // Coordinate will be checked if a ship is there on button click
                    Player2.board.receiveAttack(i, j, Player1);
                    // Switch turn variables after move has been made
                    Player2.turn = true;
                    Player1.turn = false;
                    whosTurn(Player1, Player2);
                    makeBoardDom(Player2);
                    // If its time for computer to move, do so
                    checkForComputerMove(Player2, Player1);   
                    squareEventlistener(Player1, Player2);
                })
            } else if (Player2.turn == true) {
                document.getElementById(`${i}, ${j}`).addEventListener('click', () => {
                    Player1.board.receiveAttack(i, j, Player2);
                    // switch turn variables after turn has been made
                    Player1.turn = true;
                    Player2.turn = false;
                    whosTurn(Player1, Player2);
                    makeBoardDom(Player1);
                    // If its time for computer to move, do so
                    checkForComputerMove(Player1, Player2);
                    squareEventlistener(Player1, Player2);
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

