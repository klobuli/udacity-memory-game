const dogOne = '<i class="fas fa-dog"></i>';
const dogTwo = '<i class="fas fa-dog"></i>';
const catOne = '<i class="fas fa-cat"></i>';
const catTwo = '<i class="fas fa-cat"></i>';
const birdOne = '<i class="fas fa-crow"></i>';
const birdTwo = '<i class="fas fa-crow"></i>';
const hippoOne = '<i class="fas fa-hippo"></i>';
const hippoTwo = '<i class="fas fa-hippo"></i>';
const frogOne = '<i class="fas fa-frog"></i>';
const frogTwo = '<i class="fas fa-frog"></i>';
const horseOne = '<i class="fas fa-horse"></i>';
const horseTwo = '<i class="fas fa-horse"></i>';
const otterOne = '<i class="fas fa-otter"></i>';
const otterTwo = '<i class="fas fa-otter"></i>';
const spiderOne = '<i class="fas fa-spider"></i>';
const spiderTwo = '<i class="fas fa-spider"></i>';

let cardsArray = [dogOne, dogTwo, catOne, catTwo, birdOne, birdTwo, hippoOne, hippoTwo, frogOne, frogTwo, horseOne, horseTwo, otterOne, otterTwo, spiderOne, spiderTwo];
let shuffledCardsArray = [];

/* shuffle function */

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
