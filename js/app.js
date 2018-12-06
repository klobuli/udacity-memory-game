const dogOne = '<i class="fas fa-dog fa-card"></i>';
const dogTwo = '<i class="fas fa-dog fa-card"></i>';
const catOne = '<i class="fas fa-cat fa-card"></i>';
const catTwo = '<i class="fas fa-cat fa-card"></i>';
const birdOne = '<i class="fas fa-crow fa-card"></i>';
const birdTwo = '<i class="fas fa-crow fa-card"></i>';
const hippoOne = '<i class="fas fa-hippo fa-card"></i>';
const hippoTwo = '<i class="fas fa-hippo fa-card"></i>';
const frogOne = '<i class="fas fa-frog fa-card"></i>';
const frogTwo = '<i class="fas fa-frog fa-card"></i>';
const horseOne = '<i class="fas fa-horse fa-card"></i>';
const horseTwo = '<i class="fas fa-horse fa-card"></i>';
const otterOne = '<i class="fas fa-otter fa-card"></i>';
const otterTwo = '<i class="fas fa-otter fa-card"></i>';
const spiderOne = '<i class="fas fa-spider fa-card"></i>';
const spiderTwo = '<i class="fas fa-spider fa-card"></i>';
let cardsArray = [dogOne, dogTwo, catOne, catTwo, birdOne, birdTwo, hippoOne, hippoTwo, frogOne, frogTwo, horseOne, horseTwo, otterOne, otterTwo, spiderOne, spiderTwo];

// variables to track status of the game

let revealCount = 0;
let totalMoves = 0;
let failedMoves = 0;
let totalMatches = 0;

// shuffle function

function shuffle(arrayToShuffle) {
	let shuffledCardsArray = [];
	let randomNumbersUsed = [];
	for (let i = 0; i < arrayToShuffle.length; i++) {
		const randomNumber = Math.floor(Math.random()*arrayToShuffle.length);
		if (!randomNumbersUsed.includes(randomNumber)) {
			shuffledCardsArray.push(arrayToShuffle[randomNumber]);
			randomNumbersUsed.push(randomNumber);
		}
		else if(randomNumbersUsed.includes(randomNumber)) {
			i--;
		}
	}
	return shuffledCardsArray;
}

// function that invokes the shuffle function and appends list items to the existing ul element

function createGrid() {
	const random = shuffle(cardsArray);
	const unorderedList = document.querySelector('.card-grid');
	for(let i = 0; i < random.length; i++) {
		const listItem = document.createElement('li');
		listItem.classList.add('card');
		listItem.innerHTML = random[i];
		unorderedList.appendChild(listItem);
		play();
	}
}

// event listener to unreveal cards

function unreveal(evt) {
	evt.currentTarget.classList.add('open');
	revealCount++;
	if(document.querySelector('.timer').textContent === '00:00' && revealCount === 1) {
		timer();
	}
	if(revealCount === 2) {
		check();
	}
}

// function to add the event listener to the list items

function play() {
	const card = document.querySelectorAll('.card');
	for(let i = 0; i < card.length; i++) {
		card[i].addEventListener('click', unreveal, { once: true });
	}
}

// function to compare revealed cards

function check() {
	const dontClick = document.querySelector('.card-grid');
	dontClick.style.pointerEvents = 'none';
	const checkOpenedCards = document.querySelectorAll('.open');
	if(checkOpenedCards[0].innerHTML === checkOpenedCards[1].innerHTML) {
		for(let i = 0; i < checkOpenedCards.length; i++) {
			setTimeout(function() {
				checkOpenedCards[i].classList.remove('card', 'open');
				checkOpenedCards[i].classList.add('matched');
				dontClick.style.pointerEvents = 'auto';
			}, 1000);
		}
		totalMatches++;
		if(totalMatches === 8) {
			won();
		}
	}
	else if(checkOpenedCards[0].innerHTML !== checkOpenedCards[1].innerHTML) {
		for(let i = 0; i < checkOpenedCards.length; i++) {
			setTimeout(function() {
				checkOpenedCards[i].addEventListener('click', unreveal, { once: true });
				checkOpenedCards[i].classList.remove('open');
				dontClick.style.pointerEvents = 'auto';
			}, 1000);
		}
		failedMoves++;
	}
	totalMoves++;
	movesCount();
	starRating();
	revealCount = 0;
}

// congratulations function

function won() {
	setTimeout(function() {
		const grats = document.createElement('div');
		grats.classList.add('congratulations');
		document.body.appendChild(grats);
		setTimeout(function() {
			const gratsTextContainer = document.createElement('div');
			gratsTextContainer.classList.add('congrats-text-container');
			grats.appendChild(gratsTextContainer);
			const gratsHeading = document.createElement('h2');
			gratsHeading.classList.add('congratulations-heading');
			gratsHeading.innerHTML = 'Congratulations,<br>you made it!';
			gratsTextContainer.appendChild(gratsHeading);
			const finalRating = document.querySelector('.stars').innerHTML;
			const finalTime = document.querySelector('.timer').innerHTML;
			const finalResults = document.createElement('p');
			finalResults.classList.add('your-results');
			finalResults.innerHTML = `Moves: ${totalMoves}<br>Time: ${finalTime}<br>Rating: ${finalRating}<br>`;
			gratsTextContainer.appendChild(finalResults);
			const playAgain = document.createElement('a');
			playAgain.setAttribute('href', '');
			playAgain.classList.add('play-again');
			playAgain.textContent = 'Play again';
			gratsTextContainer.appendChild(playAgain);
			playAgain.addEventListener('click', function(evt) {
				evt.preventDefault();
				grats.remove();
			});
			playAgain.addEventListener('click', restartListener);
		}, 500);
	}, 2000);
}

// restart event listener function

function restartListener(evt) {
	totalMoves = 0;
	movesCount();
	failedMoves = 0;
	starRating();
	totalMatches = 0;
	revealCount = 0;
	const timer = document.querySelector('.timer');
	timer.remove();
	const newTimer = document.createElement('div');
	newTimer.classList.add('timer');
	newTimer.textContent = '00:00';
	document.querySelector('.page-heading').insertAdjacentElement('afterend', newTimer);
	const animation = document.createElement('div');
	animation.classList.add('restart-animation');
	document.body.appendChild(animation);
	setTimeout(function() {
		animation.remove();
	}, 500);
	const unorderedList = document.querySelector('.card-grid');
	unorderedList.remove();
	const newGrid = document.createElement('ul');
	newGrid.classList.add('card-grid');
	const main = document.querySelector('main');
	main.appendChild(newGrid);
	createGrid();
}

// restart function

function restart() {
	const restartGame = document.querySelector('.fa-redo-alt');
	restartGame.addEventListener('click', restartListener);
}

// moves counter function

function movesCount() {
	const moves = document.querySelector('.moves');
	if(totalMoves === 1) {
		moves.textContent = `${totalMoves} move`;
	}
	else {
		moves.textContent = `${totalMoves} moves`;
	}
}

// star rating function

function starRating() {
	const starsContainer = document.querySelector('.stars');
	if(failedMoves <= 4) {
		starsContainer.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
	}
	else if(failedMoves > 4 && failedMoves <= 7) {
		starsContainer.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star star-unfilled"></i>';
	}
	else if(failedMoves > 7 && failedMoves <= 10) {
		starsContainer.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
	}
	else if(failedMoves > 10 && failedMoves <= 13) {
		starsContainer.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
	}
	else if(failedMoves > 14) {
		starsContainer.innerHTML = '<i class="fas fa-star"></i><i class="far fa-star"><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
	}
}

// timer function

function timer() {
	const time = document.querySelector('.timer');
	let m1 = 0;
	let m2 = 0;
	let s1 = 0;
	let s2 = 0;
	let count = setInterval(function() {
		if(totalMatches === 8) {
			clearInterval(count);
		}
		s2++;
		if(s2 === 10) {
			s2 = 0;
			s1++;
		}
		if(s1 === 6) {
			s1 = 0;
			m2++;
		}
		if(m2 === 10) {
			m2 = 0;
			m1++;
		}
		time.textContent = `${m1}${m2}:${s1}${s2}`;
		if(m1 >= 6) {
			clearInterval(count);
			time.textContent = "I can't believe you need more than one hour for this!";
		}
	}, 1000);
}


createGrid();
restart();
movesCount();
starRating();
