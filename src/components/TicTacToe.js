import React, { useState } from 'react';

function TicTacToe() {
    const [grid, setGrid] = useState(Array(9).fill(null));
    const [char, setChar] = useState("X");
    const [winner, setWinner] = useState(null);
    const [player1Name, setPlayer1Name] = useState("X");
    const [player2Name, setPlayer2Name] = useState("O");
    const [history, setHistory] = useState([]); // New state for match history
    const [selectedMatch, setSelectedMatch] = useState(null); // State to store the selected match
    const [selectedMatchGrid, setSelectedMatchGrid] = useState(null); // State to store the selected match grid

    const checkWinner = (gridVal) => {
        const winScenarios = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winScenarios.length; i++) {
            const [a, b, c] = winScenarios[i];
            if (gridVal[a] && gridVal[a] === gridVal[b] && gridVal[a] === gridVal[c]) {
                return gridVal[a];
            }
        }

        return null;
    };

    const handleClick = (index) => {
        if (grid[index] === null && !winner) {
            const newGrid = [...grid];
            newGrid[index] = char;
            setGrid(newGrid);
            setChar(char === 'X' ? 'O' : 'X');

            const result = checkWinner(newGrid);
            if (result) {
                setWinner(result === 'X' ? player1Name : player2Name);

                setHistory([
                    ...history,
                    { winner: result === 'X' ? player1Name : player2Name, grid: newGrid },
                ]);
            } else if (newGrid.every((Val) => Val !== null)) {
               
                setWinner('Draw');

                setHistory([
                    ...history,
                    { winner: 'Draw', grid: newGrid },
                ]);
            }
        }
    };


    const GridButton = (index) => {
        let buttonClass = "tictac";
        const gridToUse = selectedMatchGrid || grid;
        //console.log(gridToUse);

        if (gridToUse[index] === "O") {
            buttonClass = "tactoeO";
        } else if (gridToUse[index] === "X") {
            buttonClass = "tactoeX";
        }

        return (
            <div>
                <button className={buttonClass} onClick={() => handleClick(index)}>
                    {gridToUse[index]}
                </button>
            </div>
        );
    };

    const resetGrid = () => {
        setGrid(Array(9).fill(null));
        setChar('X');
        setWinner(null);
        //setPlayer1Name('Player 1');
        //setPlayer2Name('Player 2');
        //setHistory([]);
        setSelectedMatch(null);
        setSelectedMatchGrid(null);

    };

    const ShowResult = () => {
        const gridToUse = selectedMatchGrid || grid;
        const result = checkWinner(gridToUse);
        const WinnerName = selectedMatch ? selectedMatch.winner : winner;
        //console.log(WinnerName);
        if (result) {
            return (
                <div>
                    <div >{WinnerName}</div>
                    <div> IS THE WINNER !!!</div>
                </div>
            );
        } else if (grid.every((Val) => Val !== null)) {
            return 'It\'s a draw!';
        } else if (WinnerName === "Draw") {
            return `DRAW MATCH :)`;
        }
        else {
            let name = char === 'X' ? player1Name : player2Name;
            return `Turn : ${name}`;
        }
    };

    const handleSelectMatch = (i) => {
        const selectedMatchData = history[i];
        setSelectedMatch(selectedMatchData);
        setSelectedMatchGrid(selectedMatchData.grid);
    };

    return (
        <div className="tictactoe">
            <br />
            <div className="row">
                {GridButton(0)}
                {GridButton(1)}
                {GridButton(2)}
            </div>
            <div className="row">
                {GridButton(3)}
                {GridButton(4)}
                {GridButton(5)}
            </div>
            <div className="row">
                {GridButton(6)}
                {GridButton(7)}
                {GridButton(8)}
            </div>
            <div className="status">{ShowResult()}</div>
            <div className="player-names">
                Player Names:
                <input className='playertxt'
                    type="text"
                    placeholder="Player 1 Name"
                    value={player1Name}
                    onChange={(e) => setPlayer1Name(e.target.value)}
                />
                <input className='playertxt'
                    type="text"
                    placeholder="Player 2 Name"
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                />
            </div>
            <div className="row">
                <button className="reset-button" onClick={resetGrid}>Reset grid</button>
            </div>

            <div  id='score'>
                
                <h2>SCORE BOARD</h2>
                
                
                <ol>
                    {history.map((object, index) => (
                        <li>
                            Winner - {object.winner}
                            <button className='select-match' onClick={() => handleSelectMatch(index)}>➤</button>
                        </li>
                    ))}
                </ol>
                
            </div>
        </div>
    );
}

export default TicTacToe;
