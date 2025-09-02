let gameSeq = [];
let playerSeq = [];

let btns = ['red', 'yellow', 'purple', 'green'];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
document.addEventListener("keydown", function () {
    if (started == false) {
        started = true;

        levelUp();
    }
})

function levelUp() {
    playerSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let ranIndex = Math.floor(Math.random() * 4);
    let ranColor = btns[ranIndex];
    let ranbtn = document.querySelector(`.${ranColor}`)
    gameSeq.push(ranColor);
    gameFlash(ranbtn);

}

function gameFlash(x) {
    x.classList.add("gameFlash");
    setTimeout(function () {
        x.classList.remove("gameFlash");
    }, 200)
}

let allBtns = document.querySelectorAll('.btn')
for (btn of allBtns) {
    btn.addEventListener('click', btnPress)
}

function btnPress() {
    let btn = this;

    gameFlash(btn);
    playerSeq.push(this.classList[1]);

    checkAns(playerSeq.length - 1);
}

function checkAns(index) {
    if (playerSeq[index] === gameSeq[index]) {
        if (playerSeq.length == gameSeq.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        if (highScore <= level) {
            highScore = level;
        }

        h2.innerText = `Game Over! Your score was ${level}\n Press any key to start again\nHigh Score: ${highScore}`;
        document.querySelector("body").style.backgroundColor = 'red';
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = 'white';
        }, 150)
        reset();
    }
}

function reset() {
    started = false;
    playerSeq = [];
    gameSeq = [];
    level = 0;
}
