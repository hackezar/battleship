import { createPlayer } from "./player";


describe('Create a player factory function', () => {
    let Human = createPlayer('human');
    let Computer = createPlayer('computer');
    test('Two types of players in game, real and computer', () => {
        expect(Human.type).toBe('human');
        expect(Computer.type).toBe('computer');
    });
    test('Each player object should contain its own gameboard', () => {
        expect(Human.board).toBeTruthy();
        expect(Computer.board).toBeTruthy();
    });
});