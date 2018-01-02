// Task 1

// дается строка и от первого нажатия до последнего
// правильного набранного знака считать время
const lang = "cnjlaz";
const string = "qryte";
const langString = lang + string;
const charsArr = langString.split("").reverse();
const timerOutput = document.querySelector(".timer");


const exercise = document.querySelector(".exercise");
exercise.textContent = langString;

const keyboard = document.querySelector(".keyboard");

let min = document.querySelector(".min");
let sec = document.querySelector(".sec");
let miliSec = document.querySelector(".miliSec");

let count = document.querySelector(".count");
let storageCount = document.querySelector(".storageCount");


let checkStroke = [];
let z = charsArr.length-1; 
let callback = (event) => {
	if (event.key == charsArr[z]) {
		var newBtn = document.createElement('button');
		newBtn.innerHTML = charsArr[z];
		keyboard.appendChild(newBtn);

		checkStroke[z] = charsArr[z];

		if (checkStroke[0] == charsArr[0]) {
			stopTimer();
		}

		z--;
	}
}

window.addEventListener("keydown", callback);


let timer;

const startTimer = () => {
	let i = 0;
	let j = 0;
	let k = 0;
	timer = setInterval(() => {
		miliSec.innerHTML = i;
		sec.innerHTML = j;
		min.innerHTML = k;
		i++;
		if (j<10) {
			sec.innerHTML = '0' + j;
		}
		if (k<10) {
			min.innerHTML = '0' + k;
		}
		if (i==10) {
			j++;
			i=0;
			if (j==60) {
				k++;
				j=0;
			}
		}
	}, 100);
	window.removeEventListener("keydown", startTimer);
};
// localStorage.removeItem('record');
const stopTimer = () => {
	clearInterval(timer);
	let countKPS = y => y/(min.innerHTML + sec.innerHTML + miliSec.innerHTML);
	let newCountKPS = countKPS(charsArr.length);
	count.innerHTML = `Количесвтво верных клавиш в секунду - ${newCountKPS.toFixed(2)}`;

	if (newCountKPS > localStorage.getItem('record')) {
		localStorage.setItem('record', newCountKPS.toFixed(2));
	}
};

window.addEventListener("keydown", startTimer);
storageCount.innerHTML = `Ваш рекорд - ${localStorage.getItem('record')}`;