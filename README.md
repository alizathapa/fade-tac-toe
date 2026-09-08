# Fade Tac Toe

A twist on tic-tac-toe: each player can only have 3 marks on the board at once.
Place a 4th and your oldest mark disappears, so the board never fills up and
locks into the usual draw.

## Why

Standard tic-tac-toe is a solved game, with correct play it always ends in a
draw, because the 3x3 board fills up completely. Fade mode removes that dead
end: pieces cycle on and off the board, so there's always a way to keep
attacking or defending, and you have to track which of your own pieces is
about to vanish.

## Rules

- Same as normal tic-tac-toe, get 3 in a row to win.
- Once you have 3 marks on the board, placing a new one removes your oldest.
- The mark about to fade pulses so you can see it coming.
- Toggle "Classic mode" to play with the standard rules instead.


