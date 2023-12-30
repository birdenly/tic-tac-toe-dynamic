  //Default do jogo
  let boardSize = 3;
  let board = document.getElementById('board');
  let status = document.getElementById('status');
  let cells = [];
  let currentPlayer = 'X';
  let gameActive = false;
  let moves = 0;

  function startGame() { //Inicialização
    resetGame();
    boardSize = parseInt(document.getElementById('size').value); //pega o tamnho do tabuleiro pelo ID do html
    createBoard();
    gameActive = true;
    status.textContent = `Vez do jogador ${currentPlayer}`;
  }

  function resetGame() { //reseta o jogo
    board.innerHTML = ''; // limpa todo o conteudo do tabuleiro
    cells = []; //limpa a array
    moves = 0; // 0 jogadas por ter resetado
    gameActive = false; //jogo nao esta mais ativo
    currentPlayer = 'X'; //X é sempre o primeiro
    status.textContent = ''; //Não tem jogador ainda
  }

  function createBoard() { //criaçao do tabuleiro
    board.innerHTML = ''; // inicializaçao vazia
    board.style.gridTemplateColumns = `repeat(${boardSize}, 40px)`; // tabela no estilo grade que repete pelo tamanho passado pelo HTML com 40px de distancia
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div'); //criaçao de uma div
        cell.classList.add('cell'); //adiciona a classe cell a div criada acima
        cell.addEventListener('click', (event) => handleCellClick(i,j)); //cria um evento quando há um click, que vai ser manipulado pela função
        cells.push(cell); // adiciona o cell a array para logica do jogo
        board.appendChild(cell); //adiciona a div ao HTML
      }
    }
  }

  function handleCellClick(i,j) { //manipular o click
    if (!gameActive) return; //caso o jogo não esteja ativo, faz nada

    const row = i;
    const col = j;

    if (isValidMove(row, col)) return; // checa se a celula tem conteudo dentro X ou O, true caso tenha algo

    moves++;
    markCell(row, col); // adicionar jogada a ao tabuleiro,

    if (checkWinner(row, col)) { //ve condiçoes de vitoria
      status.textContent = `Jogador ${currentPlayer} ganhou!`;
      gameActive = false;
    } else if (moves == boardSize * boardSize) { //preenchimento maximo da tabela entao empate
      status.textContent = "Empate!";
      gameActive = false;
    } else {

      if(currentPlayer == 'X'){ //troca de jogador
        currentPlayer = 'O';

      }else{
        currentPlayer = 'X';
      }
      status.textContent = `Vez do jogador ${currentPlayer}`;
    
    }
  }

  function isValidMove(row, col) {//retorna o conteudo da celula se existir
    return cells[row * boardSize + col].textContent;
  }

  function markCell(row, col) {
    let cellIndex = row * boardSize + col;
    let cell = cells[cellIndex]; //indice no array onde sera marcado
    cell.textContent = currentPlayer; //X ou O
    if (currentPlayer == 'X'){ //cores diferentes para X ou O
      cell.classList.add("markedX");
    }
    else if (currentPlayer == 'O'){
      cell.classList.add("markedO");
    }
  }

  function checkWinner(row, col) {//ve se algum é true
    return (
      checkRow(row) ||
      checkCol(col) ||
      checkDiagonalLeft() ||
      checkDiagonalRight()
    );
  }

  function checkRow(row) {// 0,1 0,2 0,3
    for (let i = 0; i < boardSize; i++) {
      if (cells[row * boardSize + i].textContent !== currentPlayer) {
        return false;
      }
    }
    return true;
  }

  function checkCol(col) {//1,0 2,0 3,0
    for (let i = 0; i < boardSize; i++) {
      if (cells[i * boardSize + col].textContent !== currentPlayer) {
        return false;
      }
    }
    return true;
  }

  function checkDiagonalLeft() {//0,0 1,1 2,2
    for (let i = 0; i < boardSize; i++) {
      if (cells[i * boardSize + i].textContent !== currentPlayer) {
        return false;
      }
    }
    return true;
  }

  function checkDiagonalRight() {//0,0 1,1 2,2
    for (let i = 0; i < boardSize; i++) {
      if (cells[i * boardSize + (boardSize - 1 - i)].textContent !== currentPlayer) {
        return false;
      }
    }
    return true;
  }