
/* DOM elements and declarations */ 

let deck = document.querySelector('#deck');
let movesCounter = document.querySelector(".moves");
let stars = document.querySelector('.stars').childNodes;
let starsRate = document.querySelector('.stars');
let hourCounter = document.querySelector(".hour");
let minuteCounter = document.querySelector(".minutes");
let secondsCounter = document.querySelector(".seconds");
let restart = document.querySelector(".restart");
let timer = document.querySelector(".timer");
let modal = document.querySelector('.modal');
let timeResults = document.querySelector('.time-modal');
let ratingModal = document.querySelector('.rating-modal');
let movesModal = document.querySelector('.moves-modal');
let btnModal = document.querySelector('.button-modal');
let cards = ["fa fa-cube", 
		"fa fa-cube", 
		"fa fa-diamond", 
		"fa fa-leaf", 
		"fa fa-paper-plane-o",
		"fa fa-anchor", 
		"fa fa-bolt", 
		"fa fa-bomb", 
		"fa fa-anchor", 
		"fa fa-bolt", 
		"fa fa-bomb", 
		"fa fa-bicycle",
		"fa fa-bicycle",
		"fa fa-diamond", 
		"fa fa-leaf", 
		"fa fa-paper-plane-o",
		];
		
let checkedCards = [];
let matchedCards = [];
		
let timeCounter;
let timerOn = false;

let seconds = 0;
let minutes = 0;
let hours = 0;

let moves = 0;

createCards();

/* Deck creation and EventListener */

function createCards() {
    let newDeck = document.createElement('ul');
	deck.innerHTML = "";
    newDeck.classList.add('deck');
    let shufCards = shuffle(cards);
    for (let i = 0; i < shufCards.length; i++) {
        let newList = document.createElement('li');
        newList.classList.add('card');
        newList.innerHTML = `<i class="${shufCards[i]}"></i>`;
        newDeck.appendChild(newList);
    }
    deck.append(newDeck);
    deck.addEventListener('click', clickedFunction);
}

/* Open cards */ 

function clickedFunction(e) {
    let selectedCard = e.target;
    if (selectedCard.classList.contains("card") &&
        !selectedCard.classList.contains("open", "show", "match")) {
        if (timerOn === false) {
            startTimer();
            timerOn = true;
        }
        selectedCard.classList.add("open", "show");
        checkedCards.push(selectedCard);
    }
    if (checkedCards.length === 2) {
        deck.classList.add("stop-event");
        movesNum();
        if (checkedCards[0].innerHTML === checkedCards[1].innerHTML) {
            matchedFunction();
        } else {
            setTimeout(noMatched, 800);
        }
        winner();
    }
}

/*Moves*/

function movesNum() {
    moves++;
    if (moves === 1) {
        movesCounter.innerHTML = `1  Move`;
    } else {
        movesCounter.innerHTML = `${moves}  Moves`;
    }
    starsRating();
}

/* Stars*/

function starsRating() {
    if (moves === 12) {
        stars[5].classList.add('grey');
    } else if (moves === 20) {
        stars[3].classList.add('grey');
    }
}

/* Matched cards*/ 

function matchedFunction() {
    checkedCards[0].classList.add("match");
    checkedCards[1].classList.add("match");
    matchedCards.push(checkedCards[0]);
    matchedCards.push(checkedCards[1]);
    checkedCards = [];
    deck.classList.remove("stop-event");
} 
function noMatched() {
    checkedCards[0].classList.remove("open", "show");
    checkedCards[1].classList.remove("open", "show");
    checkedCards = [];
    deck.classList.remove("stop-event");
}


/*Timer fix*/

function fix(x, y) {
    if (x < 10) {
        return (y.innerHTML = ` 0${x}`);
    } else {
        return (y.innerHTML = ` ${x}`);
    }
}

function startTimer() {
    if (seconds == 0) {
        seconds++;
    }

    timeCounter = setInterval(function () {

        hourCounter.innerHTML = `${hours}`;
        minuteCounter.innerHTML = ` ${minutes} `;
        secondsCounter.innerHTML = ` ${seconds} `;
        fix(seconds, secondsCounter);
        fix(minutes, minuteCounter);
        fix(hours, hourCounter);

        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        } else if (minutes == 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
}

/* Restart game */

function replayGame() {
    timerOn = false;
    moves = 0;
    movesCounter.innerHTML = `0 Moves`;
    matchedCards = [];
    checkedCards = [];
    createCards();
    clearInterval(timeCounter);
    seconds = 0;
    minutes = 0;
    hours = 0;
    secondsCounter.innerText = "00";
    minuteCounter.innerText = " 00";
    hourCounter.innerText = "00";
    stars[5].classList.remove('grey');
    stars[3].classList.remove('grey');
}

restart.addEventListener("click", replayGame);

/* Winner */

function winner() {
    if (matchedCards.length === 16) {
        timeResults.innerText = timer.innerText;
        ratingModal.innerHTML = starsRate.innerHTML;
        movesModal.innerHTML = movesCounter.innerHTML.slice(0, 3);
        clearInterval(timeCounter);
        modal.style.display = 'block';
    }
}

btnModal.addEventListener('click', function () {
    modal.style.display = 'none';
    replayGame();
    timerOn = false;
})


// Shuffle function from http://stackoverflow.com/a/2450976//

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

