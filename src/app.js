export function buildBoardDom(Player1, Player2) {
    // layout
    let layout = document.createElement('div');
    layout.setAttribute('id', 'layout');
    document.body.appendChild(layout);
    // Header
    let header = document.createElement('div');
    let score1 = document.createElement('div');
    let score2 = document.createElement('div');
    header.setAttribute('class', 'header');
    score1.setAttribute('id', 'player1score');
    score1.classList.add('scoreHeader');
    score2.setAttribute('id', 'player2score');
    score2.classList.add('scoreHeader');    
    header.appendChild(score1);
    header.appendChild(score2);
    layout.appendChild(header);
    score1.innerHTML = `<div class='playerName'>${Player1.name}</div>` + 
                       "<div class=playerShips'>Ships left: 5</div>";
    score2.innerHTML = `<div class='playerName'>${Player2.name}</div>` + 
                       `<div class=playerShips'>Ships left: 5</div>`;
    // Container
    let container = document.createElement('div');
    container.setAttribute('id', 'boardContainer');
    layout.appendChild(container);
    container = document.getElementById('boardContainer');
    
    for (let i=0; i< 10; i++) {
        for (let j=0; j<10; j++) {
            const node = document.createElement('div');
            node.classList.add('grid-cell');
            node.setAttribute('id', `${i}, ${j}`);
            // event listener for square
            container.appendChild(node);
        }
    }

    // footer
    let footer = document.createElement('div');
    let turnOutput = document.createElement('div');
    turnOutput.setAttribute('id', 'turnOutput');
    footer.setAttribute('id', 'footer');
    footer.appendChild(turnOutput);
    layout.appendChild(footer);
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
            return Player1, Player2
        }
        else if (random == 1) {
            Player2.turn = true;
            Player1.turn = false;
            document.getElementById('player2score').classList.add('yourTurn');
            document.getElementById('player1score').classList.remove('yourTurn');
            document.getElementById('turnOutput').innerHTML = `${Player2.name}'s Turn! Make your pick.`
            return Player1, Player2
        }
    }
}
