var canvas = document.getElementById("canvas");
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
    }

    // Metodos
    move(){
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
        console.log(this.body);
    }

    // Getters and setters
}

var snake = new Snake(Math.round(mapSideParts/2)-1,Math.round(mapSideParts/2)-1);
//var apple = new Apple();

window.onload = () => {
    gameLoop();
}

function gameLoop(){
    setInterval(draw,1000/30); // 30fps
    setInterval(game,1000/20); // Velocidad del juego
}

function draw(){
    let mapSideLenght;

    if (document.documentElement.getBoundingClientRect().width < document.documentElement.getBoundingClientRect().height){
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
}

function game(){
    snake.move();
}

window.addEventListener("keydown", (event) =>{
    setTimeout(() => {
        if((event.keyCode == 37 || event.keyCode == 39) && snake.moveX==0){
            if(event.keyCode == 37){
                snake.moveX = -1;
            }else{
                snake.moveX = 1;
            }
            snake.moveY = 0;
        }else if((event.keyCode == 38 || event.keyCode == 40) && snake.moveY==0){
            if(event.keyCode == 38){
                snake.moveY = -1;
            }else{
                snake.moveY = 1;
            }
            snake.moveX = 0;
        }
    }, 1);
});