import React, { useState, useEffect } from "react";
import "./tic-tac-toe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const savedScore = JSON.parse(
      localStorage.getItem("tic-tac-toe-score") || "{}"
    );
    if (savedScore) {
      setScore(savedScore);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tic-tac-toe-score", JSON.stringify(score));
  }, [score]);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setScore((prevScore) => ({
          ...prevScore,
          [board[a] as "X" | "O"]: prevScore[board[a] as "X" | "O"] + 1,
        }));
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <div className="scoreboard">
        <div>Player X: {score.X}</div>
        <div>Player O: {score.O}</div>
      </div>
      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell ? "filled" : ""}`}
            onClick={() => handleClick(index)}
            aria-label={`Cell ${index + 1}`}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <div className="winner">
          {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      <div className={`turn-indicator ${isXNext ? "x-turn" : "o-turn"}`}>
        {isXNext ? "X" : "O"}'s Turn
      </div>
    </div>
  );
};

export default TicTacToe;
