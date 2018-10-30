// console.log("Up and running!");

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

var cardsInPlay = [];
var matchAlert = document.querySelector('.match-alert');

var matchMessage = function(message) {
  matchAlert.innerHTML = message;
};

//In place shuffle. Fisher-Yates Algorithm
const shuffleCards = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

var generateCards = function(sizeOfDeck, shuffle) {
  // Function to add cards depending on selected size of board
  for (let i = 0; cards.length < sizeOfDeck; i += cardOptions.length * 2) {
    for (let j = 0; cards.length < sizeOfDeck && j < cardOptions.length; j++) {
      cards.push(cardOptions[j], cardOptions[j]);
    }
  }
  shuffle(cards);
};

var createBoard = function() {
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src', 'images/back.png');
    cardElement.setAttribute('data-id', i);
    cardElement.addEventListener('click', flipCard);
    document.getElementById('game-board').appendChild(cardElement);
  }
};

var checkForMatch = function() {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    matchMessage('<h3 class="match">You found a match!</h3>');
  } else {
    matchMessage('<h3 class="no-match">Sorry, try again.</h3>');
  }
};

var flipCard = function() {
  var cardId = this.getAttribute('data-id');
  //console.log("User flipped " + cards[cardId].rank);
  //console.log("Suit: " + cards[cardId].suit);
  //console.log("Image Path: " + cards[cardId].cardImage);
  cardsInPlay.push(cards[cardId].rank);

  this.setAttribute('src', cards[cardId].cardImage);

  if (cardsInPlay.length === 2) {
    checkForMatch();
  }

};

generateCards(10, shuffleCards);
createBoard();
