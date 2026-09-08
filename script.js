const boardEl = document.getElementById('board');
let board = Array(9).fill(null);
let current = 'X';
let cellEls = [];

function buildBoard(){
  boardEl.innerHTML = '';
  cellEls = [];
  for(let i=0;i<9;i++){
    const c = document.createElement('div');
    c.className = 'cell';
    c.addEventListener('click', () => handleMove(i));
    boardEl.appendChild(c);
    cellEls.push(c);
  }
}

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWin(player){
  return WIN_LINES.some(line => line.every(idx => board[idx] === player));
}

function handleMove(i){
  if(board[i]) return;
  board[i] = current;
  cellEls[i].textContent = current;
  if(checkWin(current)){ alert(current + ' wins!'); return; }
  current = current === 'X' ? 'O' : 'X';
}

buildBoard();