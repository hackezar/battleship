// Radio icons
import HumanPic from './icons/human.svg';
import ComputerPic from './icons/robot.svg';
import { whosTurn } from './app';

// start game function
import { buildBoardDom } from './app';

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

export function squareEventlistener(Player1, Player2) {
    console.log(Player1, Player2);
    for (let i=0; i<10; i++) {
        for (let j=0; j<10; j++) {
            if (Player1.turn == true) {
                document.getElementById(`${i}, ${j}`).addEventListener('click', () => {
                    Player2.board.receiveAttack(i, j, Player1);
                    Player2.turn = true;
                    Player1.turn = false;
                    whosTurn(Player1, Player2);
                    console.log(Player1.board.missedShots, Player2.board.missedShots);
                    console.log(Player1.turn, Player2.turn);
                    squareEventlistener(Player1, Player2);
                })
            } else if (Player2.turn == true) {
                document.getElementById(`${i}, ${j}`).addEventListener('click', () => {
                    Player1.board.receiveAttack(i, j, Player2);
                    Player1.turn = true;
                    Player2.turn = false;
                    whosTurn(Player1, Player2);
                    console.log(Player1, Player2);
                    console.log(Player1.turn, Player2.turn);
                    squareEventlistener(Player1, Player2);
                });
            } else {
                throw new Error('No player has turn set to true');
            };
        }
    }
}   