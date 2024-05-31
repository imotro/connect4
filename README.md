# connect4
Use the Minimax algorithm to predict the best connect 4 move.

## Table of Contents

- [Introduction](#introduction)
- [Minimax Algorithm](#minimax-algorithm)
  - [Overview](#overview)
  - [How Minimax Works](#how-minimax-works)
- [Connect Four Game](#connect-four-game)
  - [How to Play](#how-to-play)
- [Installation](#installation)
- [License](#license)

## Introduction

Connect Four is a two-player abstract strategy game in which players take turns dropping colored discs into a grid. The objective is to be the first to form a horizontal, vertical, or diagonal line of four discs of your color. This project provides a digital version of the game that can be played against an AI opponent powered by the Minimax algorithm.

## Minimax Algorithm

### Overview

The Minimax algorithm is a decision-making algorithm used in two-player turn-based games, such as chess, tic-tac-toe, and Connect Four. It is a recursive algorithm that searches through the game tree to evaluate different possible moves and determine the best move for a player.

### How Minimax Works

1. **Recursion**: The algorithm recursively explores the game tree, alternating between maximizing and minimizing players.
2. **Evaluation**: At each leaf node of the tree (i.e., terminal states or states reached after a certain depth), a heuristic evaluation function is applied to determine the value of the state.
3. **Backtracking**: The algorithm backtracks from leaf nodes to parent nodes, propagating the values up the tree.
4. **Decision**: Eventually, the algorithm reaches the root node, where it selects the move that leads to the best outcome for the maximizing player while assuming the opponent also makes optimal moves.

## Connect Four Game

### How to Play

1. Open [the game](https://raw.githack.com/imotro/connect4/main/index.html) in a web browser.
2. Click on any column to drop your disc into that column.
3. Play alternates between you and the AI opponent.
4. The game ends when a player achieves a winning combination or when the board is full.

### About the Code
The board is set up using JavaScript, where a table is created with the size specified in the [script.js](script.js) file, and a search depth is also initiallized. From here, each element in the table gets assigned an item from an array, where when its value changes, it modifies the array. When the user makes a move, the game first checks if it is a valid move (e.g, the column isn't full, the game isn't over) and places it at the lowest row possible, simulating the drop of the disc in a real connect 4 game. The array is then modified and sent to the AI, where it scans through, row by row, to recognize where each piece is. The AI goes through all 7 moves (each column) and decides which will increase the chance of winning the most (e.g, the pieces will result in a 4 or 3 in a row, versus an isolated disc or 2 in a row) After this, it goes through each of the user's pieces and finds their distance, determining the best move the user could make. It then takes the position of this piece, and counters it with its piece. if the user does not have at least 3 pieces by each other, it focuses on Maximizing its output, and tries to win instead of stop the user from winning. After this, it re-assembles the array, as well as tracking how well the user maximized his/her own chance of winning. It renders this in the front end, calculating the score upfront and giving the total calculation time, as well as a re-render of the board.

### Features
- AI opponent
- User's moves are rated
- AI thinking time averages 20ms
- Moves can be replayed by entering the column numbers (0-6) played by the user in order as the "moves" url parameter

## Installation

To run the Connect Four game locally, simply clone this repository and open the `index.html` file in a web browser:

```bash
git clone https://github.com/imotro/connect4.git
cd connect4
```

## License

This project is licensed under the [MIT License](LICENSE).
