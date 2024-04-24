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
    Gameboard.placeShip(3, 'left', 2, 2, 'vert');
    test('ship has been placed on board', () => {
        expect(Gameboard.leftPlayer.shipsOnBoard).toEqual[{"hits": 0, "length": 3, "name": "Submarine", "sunk": false}];
    })
    test('Ship cant be placed off the board', () => {
        expect(() => Gameboard.placeShip(3, 'left', 10, 10)).toThrow('Coordinates are not on board');
    })
})

describe('Gameboards should have a receive attack function', () => {
        let Gameboard = createBoard();
        Gameboard.createSquares();
        Gameboard.placeShip(3, 'left', 2, 2, 'vert', 'Destoryer');
        Gameboard.placeShip(5, 'left', 0, 9, 'hori', 'Aircraft Carrier');
        Gameboard.placeShip(4, 'left', 8, 4, 'vert', 'Battleship');
        Gameboard.placeShip(3, 'left', 5, 5, 'hori', 'Submarine');
        Gameboard.placeShip(2, 'left', 0, 6, 'hori', 'Patrol boat');

    test('receive attack function takes a pair of coordinates', () => {
        //expect(Gameboard.receiveAttack(5, 5, 'left')).toBe(5, 5)
    })
    test('receive attack determines whether or not the attack hit a ship', () => {
        //expect(Gameboard.receiveAttack(5, 5, 'left').hits).toBe(1);
    })
    test('receive attack sends the hit function to the correct ship, or records the coordinates of the missed shot.', () => {
        expect(Gameboard.receiveAttack(5, 7, 'left').missedShots[0][0]).toBe(5, 7);
    })
    test('Gameboards should keep track of missed attacks so they can display them properly.', () => {
        expect(Gameboard.receiveAttack(5, 7, 'left').missedShots[0][0]).toBe(5, 7);
    })
    test('Gameboards should be able to report whether or not all of their ships have been sunk.', () => {
        expect(Gameboard.allSunk('left')).toBe(false);
    })
})


