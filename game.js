let vibor = document.querySelector('.vibor'); //див с выбором сложности и кнопкой старта
let holeStart = document.querySelector('.hole1');
let viborDiff = document.querySelector('.viborDiff'); //поле с выбором сложности
let start = document.querySelector('.start'); //кнопка начала игры
let scoreShow = document.querySelector('.score'); //вывод счета
let scoreMissShow = document.querySelector('.scoreMiss'); //вывод счета
let main = document.querySelector('.main'); //див с дырками
let holes; //дырки
let pic = document.createElement('img'); //крот

let prov = true;
let lastRand = 0;
let score = 0;
let scoreMiss = -1;
let rand;
let provClick = true;
let allHoles;
let begin = false;
let provLose = false;
let provScore = 0;
let inter;
let c = false;
let lose = false;

document.body.appendChild(pic);
pic.classList.add('krot');

//создание дырок
function create(ms, level){
	main.style.display = 'flex';
	vibor.style.display = 'none';
	holeStart.style.display = 'none';
	for(let i = 0; i < level; i++){
		for(let j = 0; j < 6; j++){
			holes = document.createElement('div');
			main.appendChild(holes);
			holes.classList.add('hole');
			let holesTop = 250 + 250 * i;
			let holesLeft = 60 + 260 * j;
			holes.style.top = holesTop + 'px';
			holes.style.left = holesLeft + 'px';
		}
	}
	allHoles = document.querySelectorAll('.hole');
	inter = setInterval(show, ms);
}

//перемещиние крота по дыркам
function show(){
	rand = Math.floor(Math.random() * allHoles.length);
	if(rand != lastRand){
		pic.src = 'mole.svg';
		pic.style.display = 'inline';
		let top = allHoles[rand].getBoundingClientRect().top;
		top = top - 110;
		pic.style.top = top + 'px';
		pic.style.left = allHoles[rand].getBoundingClientRect().left + 'px';
		provClick = true;
	}
	lastRand = rand;
	c = false;
}

//старт и выбор сложности
start.onclick = function(){
	if(viborDiff.value == 1 && prov == true){
		prov = false;
		begin = true;
		create(1500, 1);
	}else{
		if(viborDiff.value == 2 && prov == true){
			prov = false;
			begin = true;
			create(1200, 2);
		}else{
			if(viborDiff.value == 3 && prov == true){
				prov = false;
				begin = true;
				create(800, 2);
			}else{
				alert('Вы не выбрали сложность');
			}
		}
	}
}

//нажатие на крота и прибавление счета, проверка победы
pic.onclick = function(){
	c = true;
	if(lose == false && provClick == true){
		score++;
		scoreShow.innerHTML = 'Счет: ' + score;
		pic.style.display = 'none';
		provClick = false;
	}
	else{
		if(scoreMiss > 2 && provLose == false){
			scoreShow.style.display = 'none';
			scoreMissShow.style.display = 'none';
			main.style.display = 'none';
			pic.style.display = 'none';
			let win = document.createElement('div');
			win.style.fontSize = '30px';
			win.style.color = 'red';
			win.style.marginTop = '15%';
			win.style.textAlign = 'center';
			document.body.appendChild(win);
			win.innerHTML = 'Вы проиграли, ваш счет: ' + score;
			lose = true;
			clearInterval(inter);
		}
	}
}

//нажатие не на крота
document.onclick = function(){
	provScore++;
	if(begin == true && c == false){
		provClick = false;
		provScore = score;
		scoreMiss++;
		scoreMissShow.innerHTML = 'Промахов: ' + scoreMiss;
	}
	if(scoreMiss > 2 && provLose == false){
		scoreShow.style.display = 'none';
		scoreMissShow.style.display = 'none';
		main.style.display = 'none';
		pic.style.display = 'none';
		let win = document.createElement('div');
		win.style.marginTop = '15%';
		win.style.fontSize = '30px';
		win.style.textAlign = 'center';
		win.style.color = 'red';
		document.body.appendChild(win);
		win.innerHTML = 'Вы проиграли, ваш счет: ' + score;
		lose = true;
		provLose = true;
		clearInterval(inter);
	}
}