const cardOptions = [
  {
    rank: 'queen',
    suit: 'hearts',
    cardImage: 'images/queen-of-hearts.png',
  },
  {
    rank: 'king',
    suit: 'hearts',
    cardImage: 'images/king-of-hearts.png',
  },
  {
    rank: 'queen',
    suit: 'diamonds',
    cardImage: 'images/queen-of-diamonds.png',
  },
  {
    rank: 'king',
    suit: 'diamonds',
    cardImage: 'images/king-of-diamonds.png',
  },
];

const cards = [];

const cardsInPlay = [];
const matchAlert = document.querySelector('.match-alert');

const matchMessage = function (message) {
  matchAlert.innerHTML = message;
};

// In place shuffle. Fisher-Yates Algorithm
const shuffleCards = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const checkForMatch = function () {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    matchMessage('<h3 class="match">You found a match!</h3>');
    // Check if board is cleared
    // Remove matched pair from game (replace with blank image)
    // remove event listener
    // timeout then reset message to "Flip a card"
  } else {
    matchMessage('<h3 class="no-match">Sorry, try again.</h3>');
    // Flip cards back over
    // timeout then reset message to "Flip a card"
  }
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

const generateCards = function (sizeOfDeck, shuffle) {
  // Function to add cards depending on selected size of board
  for (let i = 0; cards.length < sizeOfDeck; i += cardOptions.length * 2) {
    for (let j = 0; cards.length < sizeOfDeck && j < cardOptions.length; j += 1) {
      cards.push(cardOptions[j], cardOptions[j]);
    }
  }
  shuffle(cards);
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

const resetBoard = function () {
  const board = document.getElementById('game-board');
  while (board.lastChild) {
    board.removeChild(board.lastChild);
  }
  generateCards(10, shuffleCards);
  createBoard();
};

const createControls = function () {
  document.querySelector('.reset').addEventListener('click', resetBoard);
};

createControls();
generateCards(10, shuffleCards);
createBoard();
