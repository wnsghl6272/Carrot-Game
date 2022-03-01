'use strict';
const CARROT_SIZE = 80;
import * as sound from './sound.js';

export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
        // main.js의 field.addEventListener('click', onFieldClick) 대채
    }

    init() {
        this.field.innerHTML = '';
        this._addElement('carrot', this.carrotCount, 'img/carrot.png');
        this._addElement('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }


    _addElement(className, count, imgPath) {
        let x1 = 0;
        let y1 = 0;
        let x2 = this.fieldRect.width - CARROT_SIZE;
        let y2 = this.fieldRect.height - CARROT_SIZE;
        for(let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const y = getRandomLocation(y1, y2);
            const x = getRandomLocation(x1, x2);
            item.style.top = `${y}px`
            item.style.left = `${x}px`
            this.field.appendChild(item);
        }
    }

    onClick = (event) => {
        const target = event.target;
        if(target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick('carrot');
        } else if(target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        }
    }
}

    function getRandomLocation(min, max) {
    return Math.random() * (max - min) + min;
}