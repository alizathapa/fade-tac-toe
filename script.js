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

function handleMove(i){
  if(board[i]) return;
  board[i] = current;
  cellEls[i].textContent = current;
  current = current === 'X' ? 'O' : 'X';
}

buildBoard();