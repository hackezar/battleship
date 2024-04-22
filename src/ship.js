    // Creating ship object
export const shipProto = {
    shipHit: function() {
        return this.hits++;
    },
    isSunk: function() {
        if (this.length <= this.hits)
            return this.sunk = true;
        else if (this.length > this.hits)
            return this.sunk = false;
        else
            return alert('Error with isSunk ship function');
    }
};

// Factory function to make the Ship object
export function createShip(length) {
    let ship = Object.create(shipProto);
    ship.length = length;
    ship.hits = 0;
    ship.sunk = false;
    if (length == 5)
        ship.name = 'Aircraft Carrier';
    else if (length == 4)
        ship.name = 'Battleship';
    else if (length == 3)
        ship.name = 'Submarine';
    else if (length == 2)
        ship.name = 'Patrol Boat';
    return ship;
}
 
// Gameboard object
export const gameBoard = {
    createSquares: function() {
        this.leftPlayer = new Object;
        this.rightPlayer = new Object;
        this.leftPlayer.board = [];
        this.rightPlayer.board = [];
        this.leftPlayer.shipsOnBoard = 0;
        this.rightPlayer.shipsOnBoard = 0;
        for (let i=0; i<10; i++){
            for(let j=0; j<10; j++){
                this.leftPlayer.board.push({cord: [i, j], occupied: false});
                this.rightPlayer.board.push({cord: [i, j], occupied: false});
            }
        }
        return this;
    },
    getSquareIndex: function(xCord, yCord, player) {
        for(let i=0; i<player.board.length; i++) {
            if (player.board[i].cord[0] == xCord && player.board[i].cord[1] == yCord)
                return player.board.indexOf(player.board[i]);
        }
    },

    placeShip: function(length, player, xStart, yStart, orientation) {
        // Check which player will be placing the ship
        if (player == 'left')
            player = this.leftPlayer;
        else if (player == 'right')
            player = this.rightPlayer;
        else
            console.log('Error Selecting which player the ship will be placed on');
        let count = length;
        while (count >= 1) {
            // Check if the coordinates are on the board
            if (xStart > 9 || xStart < 0 || yStart > 9 || yStart < 0) {
                throw new Error('Coordinates are not on board');
            }
            // if space is already occupied
            let squareIndex = this.getSquareIndex(xStart, yStart, player);
            // if space is already occupied
            if (player.board[squareIndex].occupied !== false)
                throw new Error('This space is already occupied by a ship');
            player.board[squareIndex].occupied = createShip(length);
            count--;
            //place ship vertically by adding to yStart
            if (orientation == 'vert')
                yStart++;
            // and vice versa
            else if (orientation == 'hori')
                xStart++;
        }
        player.shipsOnBoard++;
        // Hard fix to name the ships of 2 same lengths
        let output = player.board.filter(ship => ship.occupied.length == 3);
        if (output.length == 2)
            output[1].name = 'Cruiser';
        return this;
    },

    receiveAttack: function(xCord, yCord, player) {
        if (player == 'left')
            player = this.leftPlayer;
        else if (player == 'right')
            player == this.rightPlayer;
        else
            throw new Error('Problem choosing which player board');
        let index = this.getSquareIndex(xCord, yCord, player);
        if (player.board[index].occupied == true)

        return (xCord, yCord);
    }
}

// Factory function to make Gameboard object
export function createBoard() {
    let board = Object.create(gameBoard);
    return board;
}