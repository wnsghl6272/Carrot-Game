'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let isPlaying = false;
let score = 0;
let timer;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(()=> {
    startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
    if(!isPlaying) {
        return;
    }
    if(item === 'carrot') {
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if(item === 'bug') {
        finishGame(false); 
    }
}

gameBtn.addEventListener('click', () => {
    if(isPlaying) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    isPlaying = true;
    initGame();
    showTimerAndScore();
    startGameTimer();
    showStopButton();
    sound.playBackground();
}

function stopGame() {
    isPlaying = false;
    stopGameTimer();
    gameFinishBanner.showWithText('REPLAY?');
    hideGameButton();
    sound.playAlert();
    sound.stopBackground();
}

function finishGame(win) {
    isPlaying = false;
    hideGameButton();
    if (win) {
        sound.playWin();
    } else {
        sound.playBug();
    }
    stopGameTimer();
    sound.stopBackground();
    gameFinishBanner.showWithText(win ? 'You WON' : 'YOU LOST');
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

function initGame() {
    gameScore.innerText = CARROT_COUNT;
    score = 0;
    gameField.init();
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
