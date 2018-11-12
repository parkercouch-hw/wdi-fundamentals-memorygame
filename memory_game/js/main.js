const cardOptions = [
  {
    rank: 'queen',
    suit: 'hearts',
    cardImage: 'images/queen-of-hearts.png',
    matched: false,
  },
  {
    rank: 'king',
    suit: 'hearts',
    cardImage: 'images/king-of-hearts.png',
    matched: false,
  },
  {
    rank: 'queen',
    suit: 'diamonds',
    cardImage: 'images/queen-of-diamonds.png',
    matched: false,
  },
  {
    rank: 'king',
    suit: 'diamonds',
    cardImage: 'images/king-of-diamonds.png',
    matched: false,
  },
];

let cards = [];
let score = 0;

const cardsInPlay = [];
const matchAlert = document.querySelector('.match-alert');

const matchMessage = function (message) {
  matchAlert.innerHTML = message;
};

// Fisher-Yates Algorithm
const shuffleCards = (arr) => {
  const array = arr;
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const checkIfCleared = function () {
  if (!cards.some(x => x.matched === false)) {
    // Display completion message
    // Display score
    // Reset board/Start Over
  }
};

const checkForMatch = function () {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    matchMessage('<h3 class="match">You found a match!</h3>');
    checkIfCleared();
    // Remove matched pair from game (replace with blank image)
    // remove event listener
  } else {
    matchMessage('<h3 class="no-match">Sorry, try again.</h3>');
    // Flip cards back over
  }
  cardsInPlay.length = 0;
  window.setTimeout(matchMessage, 1000, '<h3>Flip Again!</h3>');
};

const flipCard = function () {
  const cardId = this.getAttribute('data-id');
  // console.log("User flipped " + cards[cardId].rank);
  // console.log("Suit: " + cards[cardId].suit);
  // console.log("Image Path: " + cards[cardId].cardImage);
  cardsInPlay.push(cards[cardId].rank);

  this.setAttribute('src', cards[cardId].cardImage);

  if (cardsInPlay.length === 2) {
    checkForMatch();
  }
};

const generateCards = function (sizeOfDeck, cardPool) {
  // Function to add cards depending on selected size of board
  const deck = [];
  for (let i = 0; deck.length < sizeOfDeck; i += cardPool.length * 2) {
    for (let j = 0; deck.length < sizeOfDeck && j < cardPool.length; j += 1) {
      deck.push(cardPool[j], cardPool[j]);
    }
  }
  return deck;
};

const createBoard = function () {
  for (let i = 0; i < cards.length; i += 1) {
    const cardElement = document.createElement('img');
    cardElement.setAttribute('src', 'images/back.png');
    cardElement.setAttribute('data-id', i);
    // cardElement.setAttribute('data-shown', true); // Holding off until implementation added
    cardElement.addEventListener('click', flipCard);
    document.getElementById('game-board').appendChild(cardElement);
  }
};

// const drawBoard = function (deck, board) {
//   for (let i = 0; i < deck.length; i += 1) {
//     const currCard = board[i];
//   }
// };

const resetBoard = function () {
  const board = document.getElementById('game-board');
  while (board.lastChild) {
    board.removeChild(board.lastChild);
  }
  cards = shuffleCards(generateCards(12, cardOptions));
  createBoard();
};

const createControls = function () {
  document.querySelector('.reset').addEventListener('click', resetBoard);
};

createControls();
cards = shuffleCards(generateCards(12, cardOptions));
createBoard();
