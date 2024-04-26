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
export function createShip(length, title, x, y) {
    let ship = Object.create(shipProto);
    ship.length = length;
    ship.hits = 0;
    ship.sunk = false;
    ship.title = title;
    ship.x = x;
    ship.y = y;
    return ship;
}
 
// Gameboard object
export const gameBoard = {
    createSquares: function() {
        this.gameOver = false;
        this.missedShots = [];
        this.hitShots = [];
        this.hitShips = [];
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

    addHitShips: function(ship) {
        console.log(ship);
        for (let i=0; i<this.board.hitShips; i++) {
            console.log(this.hitShip[i]);
            console.log(ship);
                if (this.hitShips[i].title == ship.title)
                    return this;
        }
        return this.hitShips.push(ship);

    },

    getSquareIndex: function(xCord, yCord) {
        for (let i=0; i<this.board.length; i++){
            if (this.board[i].x == xCord && this.board[i].y == yCord)
                return i;
        }
    },

    checkMissedShots: function (x, y) {
        // Check if missed shots has any data
        if (this.missedShots.length > 0) {
            // iterate through the array
            for (let i=0; i<this.missedShots.length; i++) {
                // If any of the missed shots match the random coordinates
                if (this.missedShots[i][0] == x && this.missedShots[i][1] == y) {
                    return true;
                }
            }
        }
        return false;
    },

    checkHitShots: function (x, y) {
        // check if hit shots has any data
        if (this.missedShots.length > 0) {
            //iterate through array
            for (let i=0; i<this.hitShots.length; i++) {
                // if any of the hit shots match the random coordinates
                if (this.hitShots[i][0] == x && this.hitShots[i][1] == y) {
                    return true;
                }
            }
        }
        return false;
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
                throw new Error('This space is already occupied by a ship');            this.board[squareIndex].occupied = createShip(length, title, this.board[squareIndex].x, this.board[squareIndex].y);
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
            console.log(ship);
            this.addHitShips(ship);
            ship.isSunk();
            console.log('hit');
            return this;
        // No ship in this space
        } else {
            console.log('miss');
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