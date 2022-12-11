var canvas = document.getElementById("canvas");
var scoreLabel = document.getElementById("score");
var keyCode = [];
var score = 0;
var animation = 0;

var snake;
var apple;

const ctx = canvas.getContext("2d");
const mapSideParts = 31;

class Snake{
    // Constructor
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.body = [{
            x:this.x,
            y:this.y
        }];
        this.body.push({
            x: this.body[this.body.length-1].x-1,
            y: this.body[this.body.length-1].y
        });
        this.body.push({
            x: this.body[this.body.length-1].x-1,
            y: this.body[this.body.length-1].y
        });
        this.moveX = 0;
        this.moveY = 0;
        this.isAlive = true;
    }

    // Metodos
    move(){
        if(keyCode.length!=0){
            if((keyCode[0] == 37 || keyCode[0] == 39) && snake.moveX==0){
                if(keyCode[0] == 37){
                    if(!(this.moveX==0 && this.moveY==0)){
                        snake.moveX = -1;
                    }
                }else{
                    snake.moveX = 1;
                }
                snake.moveY = 0;
            }else if((keyCode[0] == 38 || keyCode[0] == 40) && snake.moveY==0){
                if(keyCode[0] == 38){
                    snake.moveY = -1;
                }else{
                    snake.moveY = 1;
                }
                snake.moveX = 0;
            }
            keyCode.shift();
        }

        if (this.moveX == 1){
            if(this.body[0].x>(mapSideParts-2)){
                this.body.unshift({
                    x: 0,
                    y: this.body[0].y
                });
            }else{
                this.body.unshift({
                    x: this.body[0].x+1,
                    y: this.body[0].y
                });
            }
            this.body.pop(); // Elimina el último valor
        }else if(this.moveX == -1){
            if(this.body[0].x<1){
                this.body.unshift({
                    x: mapSideParts-1,
                    y: this.body[0].y
                });
            }else{
                this.body.unshift({
                    x: this.body[0].x-1,
                    y: this.body[0].y
                });
            }
            this.body.pop(); // Elimina el último valor
        }else if(this.moveY == 1){
            if(this.body[0].y>(mapSideParts-2)){
                this.body.unshift({
                    x: this.body[0].x,
                    y: 0
                });
            }else{
                this.body.unshift({
                    x: this.body[0].x,
                    y: this.body[0].y+1
                });
            }
            this.body.pop(); // Elimina el último valor
        }else if(this.moveY == -1){
            if(this.body[0].y<1){
                this.body.unshift({
                    x: this.body[0].x,
                    y: mapSideParts-1
                });
            }else{
                this.body.unshift({
                    x: this.body[0].x,
                    y: this.body[0].y-1
                });
            }
            this.body.pop(); // Elimina el último valor
        }
    }

    crash(){
        for(var i=1; i<this.body.length; i++){
            if(this.body[i].x == this.body[0].x && this.body[i].y == this.body[0].y){
                this.isAlive = false;
            }
        }
    }
}

class Apple{
    // Constructor
    constructor(){
        while(true){
            let count=0;

            this.x = Math.floor(Math.random() * mapSideParts);
            this.y = Math.floor(Math.random() * mapSideParts);
            
            for(var i=0; i<snake.body.length; i++){
                if(snake.body[i].x == this.x && snake.body[i].y == this.y){
                    break;
                }else{
                    count++;
                }
            }
            if (count == snake.body.length){
                break;
            }
        }
    }
}

window.onload = () => {
    gameLoop();
}

function gameLoop(){
    setInterval(draw,1000/30); // 30fps
    setInterval(game,1000/20); // Velocidad del juego
}

function draw(){
    let mapSideLenght;

    if(document.documentElement.getBoundingClientRect().width < document.documentElement.getBoundingClientRect().height){
        mapSideLenght = document.documentElement.getBoundingClientRect().width - 120;

    }else{
        mapSideLenght = document.documentElement.getBoundingClientRect().height - 120;
    }
    ctx.canvas.width = mapSideLenght;
    ctx.canvas.height = mapSideLenght;

    // Background
    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0,0,mapSideLenght,mapSideLenght);

    // Snake
    let squareSize = mapSideLenght/mapSideParts;
    for(var i=0; i<snake.body.length; i++){
        ctx.shadowColor = "#23CE6B";
        ctx.shadowBlur = squareSize/8;
        ctx.fillStyle = "#23CE6B";
        ctx.fillRect(
            snake.body[i].x*squareSize+(squareSize/8),
            snake.body[i].y*squareSize+(squareSize/8),
            squareSize-(squareSize/8)*2,
            squareSize-(squareSize/8)*2);
    }

    // Apple
    ctx.shadowColor = "#FF49AD";
    ctx.shadowBlur = squareSize/6;
    ctx.fillStyle = "#FF49AD";
    ctx.fillRect(
        apple.x*squareSize+(squareSize/8),
        apple.y*squareSize+(squareSize/8),
        squareSize-(squareSize/8)*2,
        squareSize-(squareSize/8)*2);


    if(!snake.isAlive){
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0,0,mapSideLenght,mapSideLenght);

        ctx.shadowColor = "#FFFFFF";
        ctx.shadowBlur = squareSize/8;

        ctx.font = "80px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = 'center';
        ctx.fillText("Game Over",mapSideLenght/2,mapSideLenght/2);

        animation++;
        if(animation<30){
            ctx.font = "20px Arial";
            ctx.fillText("Press spacebar to continue...",mapSideLenght/2,mapSideLenght/2+30);
        }
        if (animation>=45){
            animation=0;
        }
    }
}

function game(){
    console.log(snake.isAlive);
    if (snake.isAlive){
        snake.move();
        snake.crash();
        eat();
    }
}

function eat(){
    if(snake.body[0].x == apple.x && snake.body[0].y == apple.y){
        snake.body.unshift({
            x: apple.x,
            y: apple.y
        });
        score++;
        scoreLabel.innerHTML = "Score: "+score;
        apple = new Apple();
    }
}

window.addEventListener("keydown", (event) => {
    if(event.keyCode==32 && !snake.isAlive){
        snake.moveX=0;
        snake.moveY=0;
        snake = new Snake(Math.round(mapSideParts/2)-1,Math.round(mapSideParts/2)-1);
        apple = new Apple();

        keyCode = [];
        score=0;
        scoreLabel.innerHTML = "Score: "+score;
    }else{
        keyCode.push(event.keyCode);
    }
},false);

snake = new Snake(Math.round(mapSideParts/2)-1,Math.round(mapSideParts/2)-1);
apple = new Apple();
