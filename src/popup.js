'use strict';


export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick(); // onClick이 있으면 onClick기능을 호출해줘
            this.hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showWithText(Text) {
        this.popUpText.innerText = Text;
        this.popUp.classList.remove('pop-up--hide');
    }

    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}   