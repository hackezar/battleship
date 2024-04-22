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

    placeShip: function(length, player, xStart, yStart) {
        if (player == 'left')
            player = this.leftPlayer;
        else if (player == 'right')
            player = this.rightPlayer;
        else
            console.log('Error Selecting which player the ship will be placed on');

        let startIndex = this.getSquareIndex(xStart, yStart, player);
        console.log(player);
        player.board[startIndex].occupied = true;
        length--;
        while (length > 1) {
            yStart = yStart + 1;
            let nextIndex = this.getSquareIndex(xStart, yStart, player);
            player.board[nextIndex].occupied = true;
            length --;
        }
        yStart = yStart + 1;
        let lastIndex = this.getSquareIndex(xStart, yStart, player);
        player.board[lastIndex].occupied = true;
        player.shipsOnBoard++;
        return this;
    }
}

// Factory function to make Gameboard object
export function createBoard() {
    let board = Object.create(gameBoard);
    return board;
}