import { displayHitOrMiss } from "./dom";

// Creating ship object
export const shipProto = {

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
export function createShip(length, title) {
    let ship = Object.create(shipProto);
    ship.length = length;
    ship.hits = 0;
    ship.sunk = false;
    ship.title = title;
    return ship;
}
 
// Gameboard object
export const gameBoard = {
    createSquares: function() {
        this.gameOver = false;
        this.missedShots = [];
        this.hitShots = [];
        this.shipsOnBoard = [];
        this.board = new Array();
        class coordinate {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.occupied = false;
            }
        }
        for (let x=0; x<10; x++){
            for (let y=0; y<10; y++) {
                this.board.push(new coordinate(x, y));
            }
        }
        return this;
    },
    
    reset: function() {
        delete this
    },

    getSquareIndex: function(xCord, yCord) {
        for (let i=0; i<this.board.length; i++){
            if (this.board[i].x == xCord && this.board[i].y == yCord)
                return i;
        }
    },

    placeShip: function(length, xStart, yStart, orientation, title) {
        let count = length;
        while (count >= 1) {
            // Check if the coordinates are on the board
            if (xStart > 9 || xStart < 0 || yStart > 9 || yStart < 0) {
                throw new Error('Coordinates are not on board');
            }
            let squareIndex = this.getSquareIndex(xStart, yStart);
            // if space is already occupied
            if (this.board[squareIndex].occupied == true)
                throw new Error('This space is already occupied by a ship');
            this.board[squareIndex].occupied = createShip(length, title);
            count--;
            //place ship vertically by adding to yStart
            if (orientation == 'vert')
                yStart++;
            // and vice versa
            else if (orientation == 'hori')
                xStart++;
        }
        this.shipsOnBoard.push(createShip(length, title));
        return this;
    },

    receiveAttack: function(xCord, yCord, AttackingPlayer) {
        let index = this.getSquareIndex(xCord, yCord);
        // Ship is in this space
        if (this.board[index].occupied !== false){
            AttackingPlayer.board.hitShots.push([xCord, yCord]);
            displayHitOrMiss(xCord, yCord, AttackingPlayer, 'and hits!');
            let ship = this.board[index].occupied;
            ship.isSunk();
            return this;
        // No ship in this space
        } else {
            AttackingPlayer.board.missedShots.push([xCord, yCord]);
            displayHitOrMiss(xCord, yCord, AttackingPlayer, 'and misses!');
            return AttackingPlayer;
        }
    },

    allSunk: function (player) {
        if (player == 'left')
            player = this.leftPlayer;
        else if (player == 'right')
            player= this.rightPlayer;
        else
            throw new Error('No Player Entered');
        for(let i=0; i<player.shipsOnBoard.length; i++) {
            if (player.shipsOnBoard[i].sunk == false)
                return false;
        }
        return true;
    }
}

// Factory function to make Gameboard object
export function createBoard() {
    let board = Object.create(gameBoard);
    return board;
}