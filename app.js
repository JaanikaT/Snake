//Mängulaua tegemine
const gameBoardTable = document.getElementById('game-board');
//loome element tüüpi muutuja, kus näidatakse skoori
const scoreSpan = document.getElementById('score');
const messageDiv = document.getElementById('message');
const highScoreSpan = document.getElementById('high-score');


const height = 30;
const width = 30;

const food = ['🍕', '🍒','🍉','🍏','🍓','🥝'];
let foodY, foodX, foodIndex;
let direction = 'n';
const speed = 100;
let snake = initSnake();

let score = 0;
scoreSpan.innerText = score;

// loeb local storagest high score 
// kui high score puudub, siis 0
//näitab üleval servas
//let highScore = ;
let highScore = localStorage.getItem('high-score');
if(!highScore){
    highScore = 0;
}
highScoreSpan.innerText = highScore;
//console.log(highScore);

//paneme score span-i sisse muutuja score väärtuse
document.addEventListener('keydown', e => {
    // näitab, mis klahvi vajutati
    //console.log(e.key);
    
    switch (e.key) {
        case 'ArrowUp':
            direction = 'n';
            break;
        case 'ArrowDown':
            direction = 's';
            break;
        case 'ArrowRight':
            direction = 'e';
            break;
        case 'ArrowLeft':
            direction = 'w';
            break;
    }

});  
//document.addEventListener();

const intervalId = setInterval(runGame, speed);

generateFood();
//drawGameBoard();

function runGame() {
    updateSnake();
    drawGameBoard();
}

function generateFood(){

     do {
        foodY = [Math.floor(Math.random() * height)]
        foodX = [Math.floor(Math.random() * width)]
    } while (snake.includes(foodY + '_' + foodX));
    foodIndex = Math.floor(Math.random() * food.length)
}
    

function initSnake(){
    const snakeY = Math.floor(height/2);
    const snakeX = Math.floor(width/2);
    return [snakeY + "_"+ snakeX];
}


function updateSnake() {
    const head = snake[0].split('_');
    let headY =  parseInt(head[0]);
    let headX =  parseInt(head[1]);

    switch (direction) {
        case 'n':
            headY--;
            break;
        case 's':
            headY++;
            break;
        case 'e':
            headX++;
            break;
        case 'w':
            headX--;
            break;
    }

    //kontrollib, et poleks piiridest väljas (Kerdi kood)
    if(headX < 0){
        headX = width -1;
    }else if (headX >= width){
        headX = 0
    }
    if(headY < 0){
        headY = height -1;
    }else if (headY >= height){
        headY = 0
    }

    //kontrollime, kas ussi pea asukoht on ussi sees
    if (snake.includes(headY + '_' + headX)){
        messageDiv.innerText= "Game over!";
        messageDiv.classList.remove("hidden");
        clearInterval(intervalId);

        // kui skoor on suurem kui high-score
         //salvestab Local Storage'sse
         
        if (score > highScore){
            localStorage.setItem('high-score', score);
        }
        

    }


    //muuda pea asukohta edasi (lisa jada algusesse element, liigutab teised edasi)
    snake.unshift(headY + '_' + headX);

    if (headY == foodY && headX == foodX) {
        generateFood();

        //kasvatame muutuja score väärtust
        score++;
        //uuendame skoori rakenduses
        scoreSpan.innerText=score;
    } else {
        //eemalda lõpust saba, mis liigub edasi
        snake.pop();
    };
    
}

function drawGameBoard() {
    console.log(123);
    gameBoardTable.innerHTML='';
    for (let y = 0; y < height; y++){
        
        const tr = document.createElement('tr');

        for (let x = 0; x < width; x++){
            const td = document.createElement('td');
            
            td.dataset.y=y;
            td.dataset.x=x;

            
            if (y == foodY && x == foodX){
                td.innerText= food[foodIndex];
            }


            if ( snake.includes(y + '_' + x)){
                td.innerText = "🐸";
            }

            tr.appendChild(td);
            //console.log(y,x)
        }
        
        gameBoardTable.appendChild(tr);
    }
}


