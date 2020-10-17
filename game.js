
let card = document.getElementsByClassName('card');
let cards = [...card];


let shownCardsArray = [];
let matchedCard = document.getElementsByClassName('match');
const deck = document.querySelector('.deck');

let restartButton = document.getElementById('restart');
let moves = 0;
let moveCount = document.querySelector('.moves');

let totalSeconds = 0;
let timer = document.querySelector('.timer');
let minutesLabel = document.getElementById('minutes');
let secondsLabel = document.getElementById('seconds');
let interval = setInterval(startTimer, 1000);

let stars = document.getElementById('stars');
let starOne = document.getElementById('star1');
let starTwo = document.getElementById('star2');
let starThree = document.getElementById('star3');
let closeButton = document.getElementById('closeModal');



function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


document.body.onload = startGame();

function startGame() {
    let shuffledCards = shuffle(cards);
    for (let i = 0; i < shuffledCards.length; i++) {
         deck.appendChild(shuffledCards[i]);
         cards[i].classList.remove('open', 'show', 'match', 'disabled');
     }
}


 for (let i = 0; i < cards.length; i++) {
   let eachCard = cards[i];
   eachCard.addEventListener('click', showCard);
   eachCard.addEventListener('click', matchCheck);
   eachCard.addEventListener('click', congratsModal);
 }


  restartButton.addEventListener('click', restartGame);
  closeButton.addEventListener('click', closeModal);


function showCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
 }

 
 function matchCheck() {
   shownCardsArray.push(this);
   let cardLength = shownCardsArray.length;
   if(cardLength === 2){
       moveCounter();
     if(shownCardsArray[0].innerHTML === shownCardsArray[1].innerHTML) {
       isMatch();
     } else {
       unMatch();
     }
   }
}

 
 function isMatch() {
     shownCardsArray[0].classList.add('match', 'disabled');
     shownCardsArray[1].classList.add('match', 'disabled');
     shownCardsArray[0].classList.remove('show', 'open');
     shownCardsArray[1].classList.remove('show', 'open');
     shownCardsArray = [];
 }

 
 function unMatch() {
     shownCardsArray[0].classList.add('unmatched');
     shownCardsArray[1].classList.add('unmatched');
     disableCards();
     setTimeout(function(){
         shownCardsArray[0].classList.remove('show', 'open', 'unmatched');
         shownCardsArray[1].classList.remove('show', 'open', 'unmatched');
         enableCards();
         shownCardsArray = [];
     },500);
 }


function disableCards() {
  for(let i = 0; i < cards.length; i++){
    cards[i].classList.add('disabled');
  }
}

function enableCards() {
  for(let i = 0; i < cards.length; i++){
    cards[i].classList.remove('disabled');
  }

  for(let i = 0; i < matchedCard.length; i++){
    matchedCard[i].classList.add('disabled');
  }
}
function startTimer() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}


function moveCounter() {
    moves++;
    moveCount.innerHTML = moves;
    if ((moves > 10) && (moves < 20)) {
      document.getElementById("star3").style.visibility = "hidden";
            }
    if (moves >= 20) {
      document.getElementById("star2").style.visibility = "hidden";
    }
}


function restartGame() {
      reset();
      startGame();
    }

function reset() {
  moveCount.innerHTML = 0;
  moves = 0;
  totalSeconds = 0;
  setInterval(interval);
  
  starThree.style.visibility = "visible";
  starTwo.style.visibility = "visible";
  }



let modal = document.getElementById('myModal');


function congratsModal() {
  if(matchedCard.length === 16){
    clearInterval(interval);
    modal.style.display = 'block';
    let finalTime = timer.innerHTML;
    let finalStars = document.querySelector('#stars').innerHTML;
    let finalMoves = document.querySelector('.moves').innerHTML;
    
    document.getElementById('finalMoves').innerHTML = finalMoves;
    document.getElementById('finalStars').innerHTML = finalStars;
    document.getElementById('finalTime').innerHTML = finalTime;
    }
}

let span = document.getElementsByClassName('close')[0];


span.onclick = function() {
   modal.style.display = 'none';
   window.location.reload();
};


window.onclick = function(event) {
   if (event.target == modal) {
       modal.style.display = 'none';
       window.location.reload();
   }
};


function closeModal() {
  closeButton.addEventListener('click', function(e){
    modal.style.display = 'none';
    window.location.reload();
  });
}
