import { createShip } from "./ship";
import { createBoard } from "./ship";

describe('Ship Object created', () => {
    test('Ship object is created and has length, hits, and sunk factors', () => {
        expect(createShip(3).length).toBe(3);
        expect(createShip(3).hits).toBe(0);
        expect(createShip(3).sunk).toBe(false);
    });
});

describe('Testing ship object functions', () => {
    let Ship = createShip(3);
    Ship.shipHit();

    test('Ship hit function registers a hit on the ship', () => {
        expect(Ship.hits).toBe(1);
    });
    test('Check if ship is sunk, it shouldnt be.', () => {
        expect(Ship.isSunk()).toBe(false);
    });
});

describe('Testing of gameBoard', () => {
    let Gameboard = createBoard();
    test('Gameboard has been created', () => {
        expect(Gameboard).toBeTruthy();
    })
    Gameboard.createSquares();
    test('left and right player gameboard has been made', () => {
        expect(Gameboard.leftPlayer.board.length).toBe(100);
        expect(Gameboard.rightPlayer.board.length).toBe(100);
    })
    let squareIndex = Gameboard.getSquareIndex(5, 5, Gameboard.leftPlayer)
    test('Can get a index for squares on the board from the getSquare function', () => {
        expect(Gameboard.getSquareIndex(5, 5, Gameboard.leftPlayer)).toBe(55);
    })
    test('Board square can be accessed from the getSquareIndex', () => {
        expect(Gameboard.leftPlayer[squareIndex]).toBe[5, 5];
    })
});

describe('Placing a ship on the board', () => {
    let Gameboard = createBoard();
    Gameboard.createSquares();
    Gameboard.placeShip(3, 'left', 2, 2);
    test('ship has been placed on board', () => {
        expect(Gameboard.leftPlayer.shipsOnBoard).toBe(1);
    })
})


