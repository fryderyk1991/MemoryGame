
const startBtn = document.querySelector('.start');

// Clock
const seconds = document.querySelector('.sec');
const minutes = document.querySelector('.min')
//
const score = document.querySelector('.points > span');

const moves = document.querySelector('.clicked > span')

const board = document.querySelector('.board')

const images = [...document.querySelectorAll('.board > div')];

const body = document.querySelector('body');

const divWin = document.querySelector('.win')

// span z suma punktow
const points = document.getElementById('full-points');
//span z czasem
const time = document.getElementById('full-time')

//btn play-again 
const btnPlayAgain = document.querySelector('.play-again');


const imagesArray = ['chesse', 'cola', 'cupcake', 'fries', 'hamburger', 'icecream', 'pancake', 'pizza', 'chesse', 'cola', 'cupcake', 'fries', 'hamburger', 'icecream', 'pancake', 'pizza'];

// animacja gry podczas wejscia na strone
window.onload = AOS.init({
    once: true,
});
// refresh strony
function playAgain() {
    document.location.reload();
}

startBtn.addEventListener('click', drawAndAdd);
btnPlayAgain.addEventListener('click', playAgain);

let activePic = '';
const arrayPic = [];
let clickMoves = 0;
let scorePoints = 0;

// Czas gry

let sec = 0;  
let min = 0;

function gameTime() {
    startBtn.removeEventListener('click', gameTime);
    
    timerSec = setInterval(() => {
        sec++;
        if (sec < 10) {
            sec = "0" + sec;
        }
        if (sec === 60) {
            sec = '00';
        }
        if (scorePoints === 8) {
            clearInterval(timerSec)
        }
        seconds.innerHTML = sec;
    },1000)
    timerMin = setInterval(() => {
        min++
        // dopisanie ile ma minut trwac gra 
        if (min < 10) {
            min = '0' + min;
        }
        if (scorePoints === 8) {
            clearInterval(timerMin)
        }
        minutes.innerHTML = min;
    },60000)
}   

//

function check() {
    activePic = this;
    activePic.classList.remove('hidden');
    if (arrayPic[0] === activePic) return

    if(arrayPic.length === 0) {
        arrayPic[0] = activePic;
        return
    }
    else {
        arrayPic[1] = activePic;
        if (arrayPic[1] === activePic) {
            clickMoves++
            moves.innerHTML = clickMoves;
        }
        setTimeout(() => {
            images.forEach(img => img.classList.add('hidden'))
        }, 1500);
        images.forEach(img => img.removeEventListener('click', check))
        setTimeout(() => {
            if (arrayPic[0].className === arrayPic[1].className) {
                scorePoints++
                score.innerHTML = scorePoints;
                arrayPic.forEach(el => el.classList.add('off'))
                if (scorePoints === 8) {
                    setTimeout(() => {
                        body.classList.add('win-the-game');
                        divWin.classList.add('on');
                        points.innerHTML = clickMoves;
                        time.innerHTML = `${min} : ${sec}`;
                        }, 500);
                    }
            }
            arrayPic.length = 0;
            activePic = ''; 
        }, 1500);
            setTimeout(() => {
                images.forEach(img => img.addEventListener('click', check))
            }, 1500);   
    } 
}   
function drawAndAdd() {
    images.forEach(img => {
        let random = imagesArray.splice(Math.floor(Math.random() * imagesArray.length),1)[0];
        img.classList.add(random);
    })
      // pokazanie kafli na 2 sekundy
    images.forEach(img => {
        img.classList.remove('hidden');
    })
    setTimeout(() => {
        images.forEach(img => {
            img.classList.add('hidden');
            startBtn.removeEventListener('click', drawAndAdd);
        })
        // wywolanie funkcji liczącej czas
        gameTime()
    }, 800);
     images.forEach(img => {
            img.addEventListener('click', check);
    })
}


