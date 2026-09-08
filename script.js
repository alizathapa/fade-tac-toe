(function(){
  const boardEl = document.getElementById('board');
  const turnLabel = document.getElementById('turnLabel');
  const turnDot = document.getElementById('turnDot');
  const banner = document.getElementById('banner');
  const scoreXEl = document.getElementById('scoreX');
  const scoreOEl = document.getElementById('scoreO');
  const modeSwitch = document.getElementById('modeSwitch');
  const modeLabel = document.getElementById('modeLabel');
  const subtitle = document.getElementById('subtitle');
  const resetBtn = document.getElementById('resetBtn');
  const playBtn = document.getElementById('playBtn');

  const WIN_LINES = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  let board = Array(9).fill(null);
  let queueX = [];
  let queueO = [];
  let current = 'X';
  let gameOver = false;
  let fadeMode = true;
  let scores = { X: 0, O: 0 };
  let cellEls = [];

  function buildBoard(){
    boardEl.innerHTML = '';
    cellEls = [];
    for(let i=0;i<9;i++){
      const c = document.createElement('div');
      c.className = 'cell';
      c.dataset.i = i;
      c.addEventListener('click', () => handleMove(i));
      boardEl.appendChild(c);
      cellEls.push(c);
    }
  }

  function queueFor(p){ return p === 'X' ? queueX : queueO; }

 function handleMove(i){
  if(gameOver || board[i]) return;
  const player = current;
  const queue = queueFor(player);

  board[i] = player;
  queue.push(i);
  renderMark(i, player, true);

  const winLine = checkWin(player);

  let fadedIndex = null;
  if(!winLine && fadeMode && queue.length > 3){
    fadedIndex = queue.shift();
    board[fadedIndex] = null;
  }

  if(fadedIndex !== null){
    const el = cellEls[fadedIndex].querySelector('.mark');
    if(el){
      el.classList.remove('fading-warn');
      el.classList.add('vanish');
      setTimeout(() => { if(cellEls[fadedIndex]) cellEls[fadedIndex].innerHTML = ''; cellEls[fadedIndex].classList.remove('filled'); }, 380);
    }
  }

  if(winLine){
    gameOver = true;
    scores[player]++;
    updateScores();
    highlightWin(winLine);
    banner.textContent = player + ' wins the round';
    turnLabel.textContent = player + ' wins';
    return;
  }

  if(!fadeMode && board.every(c => c !== null)){
    gameOver = true;
    banner.textContent = "Draw — classic mode stalls out eventually";
    turnLabel.textContent = 'Draw';
    return;
  }

  current = current === 'X' ? 'O' : 'X';
  updateTurnUI();
  updateFadeWarnings();
}

  function renderMark(i, player, animate){
    const cell = cellEls[i];
    cell.classList.add('filled');
    const span = document.createElement('span');
    span.className = 'mark ' + player.toLowerCase() + (animate ? ' enter' : '');
    span.textContent = player;
    cell.innerHTML = '';
    cell.appendChild(span);
  }

  function updateFadeWarnings(){
    cellEls.forEach(c => {
      const m = c.querySelector('.mark');
      if(m) m.classList.remove('fading-warn');
    });
    if(!fadeMode) return;
    [['X', queueX], ['O', queueO]].forEach(([player, queue]) => {
      if(queue.length === 3){
        const oldest = queue[0];
        const m = cellEls[oldest].querySelector('.mark');
        if(m) m.classList.add('fading-warn');
      }
    });
  }

  function checkWin(player){
    for(const line of WIN_LINES){
      if(line.every(idx => board[idx] === player)) return line;
    }
    return null;
  }

  function highlightWin(line){
    line.forEach(i => cellEls[i].classList.add('win'));
  }

  function updateTurnUI(){
    turnLabel.textContent = current + ' to move';
    turnDot.style.background = current === 'X' ? 'var(--x-color)' : 'var(--o-color)';
    banner.textContent = '';
  }

  function updateScores(){
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
  }

  function newRound(){
    board = Array(9).fill(null);
    queueX = [];
    queueO = [];
    gameOver = false;
    current = 'X';
    buildBoard();
    updateTurnUI();
  }

  function resetAll(){
    scores = { X: 0, O: 0 };
    updateScores();
    newRound();
  }

  modeSwitch.addEventListener('click', () => {
    fadeMode = !fadeMode;
    modeSwitch.classList.toggle('on', fadeMode);
    modeLabel.textContent = fadeMode
      ? 'Fade mode — max 3 marks each, oldest vanishes'
      : 'Classic mode — standard rules, no vanishing';
    subtitle.textContent = fadeMode
      ? 'every 4th mark costs you your oldest one'
      : 'the original — plays out exactly like you remember';
    resetAll();
  });

  resetBtn.addEventListener('click', resetAll);
  playBtn.addEventListener('click', newRound);

  modeSwitch.classList.add('on');
  buildBoard();
  updateTurnUI();
  updateScores();
})();