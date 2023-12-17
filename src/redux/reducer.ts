export const ticTacToeReducer = (state: any, action: any) => {
    switch(action.type) {
        case 'pressed': {
            const newMove: 'X' | 'Y' = state.move === 'X' ? 'Y' : 'X';
            const newBoard: Array<Array<string | null>> = structuredClone(state.board);
            const {rowIndex, columnIndex} = action.payload;

            // @ts-ignore
            if (newBoard[rowIndex][columnIndex] !== null) {
                return state;
            }

            // @ts-ignore
            newBoard[rowIndex][columnIndex] = state.move;

            const gameWinner: string | null = checkForGameWinner(newBoard);

            if(!!gameWinner) {
                return {...initialTicTacToeState, winner: gameWinner}
            }

            return {...state, move: newMove, board: newBoard, timer: initialTicTacToeState.timer, winner: initialTicTacToeState.winner}
        }
        case 'restart': {
            return {...initialTicTacToeState}
        }
        case 'timer': {
            const newTime = state.timer + 1;
            return newTime < 15 ? {...state, timer: newTime} : {...initialTicTacToeState}
        }
    }
    return state;
}

export const initialTicTacToeState: {move: 'X' | 'Y', board: Array<Array<string | null>>, timer: number, winner: string | null} = {
    move : 'X',
    board: [[null, null, null], [null, null, null], [null, null, null]],
    timer: 0,
    winner: ''
};


const checkForGameWinner: (board: Array<Array<string | null>>) => string | null = (board: Array<Array<string | null>>) => {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== null) {
            return board[i][0];
        }
    }

    for (let j = 0; j < 3; j++) {
        if (board[0][j] === board[1][j] && board[0][j] === board[2][j] && board[0][j] !== null) {
            return board[0][j];
        }
    }

    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== null) {
        return board[0][0];
    }

    if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== null) {
        return board[0][2];
    }

    if (board.flat().every((cell) => cell !== null)) {
        return 'draw';
    }

    return null;
};
