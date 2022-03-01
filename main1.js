'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let isPlaying = false;
let score = 0;
let timer;

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
    if(isPlaying) {
        stopGame();
    } else {
        startGame();
    }
});

popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopUp();
});

function startGame() {
    isPlaying = true;
    initGame();
    showTimerAndScore();
    startGameTimer();
    showStopButton();
    playSound(bgSound);
}

function stopGame() {
    isPlaying = false;
    stopGameTimer();
    showPopUpWithText('REPLAY?');
    hideGameButton();
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win) {
    isPlaying = false;
    hideGameButton();
    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpWithText(win? 'You WON' : 'YOU LOST');
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    },1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(Text) {
    popUpText.innerText = Text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
    popUp.classList.add('pop-up--hide');
}

function initGame() {
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    createElement('carrot', CARROT_COUNT, 'img/carrot.png');
    createElement('bug', BUG_COUNT, 'img/bug.png');
    score = 0;
}

function onFieldClick(event) {
    if(!isPlaying) {
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')) {
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if(target.matches('.bug')) {
        finishGame(false);
        playSound(bugSound);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function createElement(className, count, imgPath) {
    let x1 = 0;
    let y1 = 0;
    let x2 = fieldRect.width - CARROT_SIZE;
    let y2 = fieldRect.height - CARROT_SIZE;
    for(let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const y = getRandomLocation(y1, y2);
        const x = getRandomLocation(x1, x2);
        item.style.top = `${y}px`
        item.style.left = `${x}px`
        field.appendChild(item);
    }
}

function getRandomLocation(min, max) {
    return Math.random() * (max - min) + min;
}