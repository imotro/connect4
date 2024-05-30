# connect4
Use the Minimax algorithm to predict the best connect 4 move.

## Table of Contents

- [Introduction](#introduction)
- [Minimax Algorithm](#minimax-algorithm)
  - [Overview](#overview)
  - [How Minimax Works](#how-minimax-works)
- [Connect Four Game](#connect-four-game)
  - [Features](#features)
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

### Features

- **Intelligent Opponent**: The game features an AI opponent powered by the Minimax algorithm, providing a challenging gameplay experience.
- **Interactive Board**: Players can interact with the game board by clicking on columns to drop their discs.
- **Win Detection**: The game automatically detects when a player achieves a winning combination.
- **Move Ratings**: The software provides a rating for each user move, indicating its quality based on the Minimax algorithm evaluation.

### How to Play

1. Open [the game](https://raw.githack.com/imotro/connect4/main/index.html) in a web browser.
2. Click on any column to drop your disc into that column.
3. Play alternates between you and the AI opponent.
4. The game ends when a player achieves a winning combination or when the board is full.

## Installation

To run the Connect Four game locally, simply clone this repository and open the `index.html` file in a web browser:

```bash
git clone https://github.com/imotro/connect4.git
cd connect4
```

## License

This project is licensed under the [MIT License](LICENSE).
