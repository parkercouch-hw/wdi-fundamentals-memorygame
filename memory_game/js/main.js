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

// Adds animate function to jQuery to use with animate.css
$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});


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
    // Temporary end of game message
    alert(`
    You win!
    Score: ${score}
    `);
    resetBoard();
  }
};

const checkForMatch = function () {
  const card1Id = cardsInPlay[0];
  const card2Id = cardsInPlay[1];
  const card1 = document.querySelector('[data-id="' + card1Id + '"]');
  const card2 = document.querySelector('[data-id="' + card2Id + '"]');

  if (cards[card1Id].rank === cards[card2Id].rank) {
    matchMessage('<h3 class="match">You found a match!</h3>');
    cards[card1Id].matched = true;
    cards[card2Id].matched = true;

    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);

    $(card1).add(card2).animateCss('flipOutY', function() {
      card1.setAttribute('src', 'images/blank.png');
      card2.setAttribute('src', 'images/blank.png');
      score += 100;
      checkIfCleared();
    });
  } else {
    matchMessage('<h3 class="no-match">Sorry, try again.</h3>');
    card1.setAttribute('src', 'images/back.png');
    card2.setAttribute('src', 'images/back.png');
    $(card1).add(card2).animateCss('flipOutY', function() {
      score -= 10;
    });

  }
  cardsInPlay.length = 0;
  window.setTimeout(matchMessage, 1000, '<h3>Flip Again!</h3>');
};

const flipCard = function () {
  const cardId = Number(this.getAttribute('data-id'));
  cardsInPlay.push(cardId);

  this.setAttribute('src', cards[cardId].cardImage);
  $(this).animateCss('flipInY', function() {
    if (cardsInPlay.length === 2) {
      checkForMatch();
    }
  });
};

const generateCards = function (sizeOfDeck, cardPool) {
  const deck = [];
  for (let i = 0; deck.length < sizeOfDeck; i += cardPool.length * 2) {
    for (let j = 0; deck.length < sizeOfDeck && j < cardPool.length; j += 1) {
      deck.push(Object.assign({}, cardPool[j]), Object.assign({}, cardPool[j]));
    }
  }
  return deck;
};

const createBoard = function () {
  for (let i = 0; i < cards.length; i += 1) {
    const cardElement = document.createElement('img');
    cardElement.setAttribute('src', 'images/back.png');
    cardElement.setAttribute('data-id', i);
    cardElement.classList.add('animated', 'fast');
    cardElement.addEventListener('click', flipCard);
    document.getElementById('game-board').appendChild(cardElement);
  }
};

const resetBoard = function () {
  const board = document.getElementById('game-board');
  while (board.lastChild) {
    board.removeChild(board.lastChild);
  }
  cards.length = 0;
  cards = shuffleCards(generateCards(12, cardOptions));
  createBoard();
  matchMessage('<h3>Flip to find a match</h3>');
};

const createControls = function () {
  document.querySelector('.reset').addEventListener('click', resetBoard);
};

createControls();
cards = shuffleCards(generateCards(12, cardOptions));
createBoard();
