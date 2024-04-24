// Radio icons
import HumanPic from './icons/human.svg';
import ComputerPic from './icons/robot.svg';

// start game function
import { startGame } from './app';

export default function homepageDom() {
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
        window.location.href = './app.html';
        startGame();
    })
}