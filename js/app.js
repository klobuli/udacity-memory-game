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
let shuffledCardsArray = [];

// shuffle function

function shuffle(arrayToShuffle) {
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
	const unorderedList = document.querySelector('#card-grid');
	for(let i = 0; i < random.length; i++) {
		const listItem = document.createElement('li');
		listItem.classList.add('card');
		listItem.innerHTML = random[i];
		unorderedList.appendChild(listItem);
	}
}

createGrid();

// function to reveal and check cards

let revealCount = 0;
let revealedAnimals = [];
let totalMatches = 0;

const card = document.querySelectorAll('.card');
for(let i = 0; i < card.length; i++) {
	card[i].addEventListener('click', function(evt) {
		card[i].classList.add('open');
		revealCount++;
		revealedAnimals.push(card[i]);
		if(revealCount === 2) {
			if(revealedAnimals[0].children[0].classList[1] === revealedAnimals[1].children[0].classList[1]) {
				const match = document.querySelectorAll('.open');
				for(let i = 0; i < match.length; i++) {
					setTimeout(function() {
						match[i].classList.remove('card');
						match[i].classList.remove('open');
						match[i].classList.add('matched');
					}, 1000);
				}
				totalMatches++;
				revealCount = 0;
				revealedAnimals = [];
			}
			else if(revealedAnimals[0].children[0].classList[1] !== revealedAnimals[1].children[0].classList[1]) {
				const noMatch = document.querySelectorAll('.open');
				for(let i = 0; i < noMatch.length; i++) {
					setTimeout(function() {
						noMatch[i].classList.remove('open');
					}, 1000);
				}
				revealCount = 0;
				revealedAnimals = [];
			}
		}
	});
}
