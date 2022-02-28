const CARROT_SIZE = 80;

const playBtn = document.querySelector('.game__button');
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const timer = document.querySelector('.game__timer');
const score = document.querySelector('.game__score');

initGame();

console.log(fieldRect);

function initGame() {
    createElement('carrot', 5, 'img/carrot.png');
    createElement('bug', 5, 'img/bug.png');
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