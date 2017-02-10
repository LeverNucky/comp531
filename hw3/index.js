window.onload=function(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var earth=new Image(); 
    earth.src= "images/earth.png";
    var background = new Image();
    background.src = "images/background.jpg";
    var spaceship = new Image();
    spaceship.src = "images/spaceship.png";
    var launcher = new Image();
    launcher.src = "images/launcher.png";
    var objects = new Array(10);
    var born=new Date();
    var angle=0;
    var totalAngle=0;
    var score = 0;
    var hp = 100;
    var rightPressed=false;
    var leftPressed=false;
    var fire=true;
    var lastHit=new Date();
    var center={x: canvas.width/2, y: canvas.height/2}
    var earthRadius=30;
    var spaceshipRadius=50;

    for (var i = 0; i < objects.length; i++)
    {
        objects[i] = getNewRandomDot(canvas.width, canvas.height);
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("click", mouseMoveHandler, false);

    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
        else if (e.keyCode==70){
            fire=true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
        else if (e.keyCode==70){
            
        }
    }
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX<canvas.width/2) {
            angle+=20;
            totalAngle+=20;
        }
        else{
            angle-=20;
            totalAngle+=20;
        }
        
    }
    

    function drawBall(location) {
        
        ctx.drawImage(spaceship,location.x,location.y,spaceshipRadius,spaceshipRadius);
        
    }
    
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score, 8, 20);
    }
    function drawHP() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("HP: "+hp, canvas.width-65, 20);
    }
    function drawAngel(){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Total Moved Angle: "+totalAngle, 16, 20);
    }
    function drawEarth(){
        ctx.drawImage(earth,canvas.width/2-earthRadius,canvas.height/2-earthRadius,2*earthRadius,2*earthRadius);
    }
    function drawLauncher(){
        var time=new Date();
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        
        ctx.rotate(angle*Math.PI/180);
        //ctx.rotate( ((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds() );
        ctx.translate(-canvas.width/2, -canvas.height/2);
        ctx.drawImage(launcher,canvas.width/2-30,canvas.height/2-30,60,30)
        ctx.restore();
    }
    function drawBackground(){
        ctx.drawImage(background,0,0);
    }
    function drawLine(from, to, hit) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        if (hit){
            ctx.strokeStyle = '#ff0000';
        }
        else{
            ctx.strokeStyle = '#000000';
        }
        ctx.stroke();
    }
    function getNewDot(x, y) {
        return { x: x, y: y, xSpeed: (Math.random()>0.5)?Math.floor(Math.random() * 4) + 2:-Math.floor(Math.random() * 4) -2
            , ySpeed: (Math.random()>0.5)?Math.floor(Math.random() * 4) + 2:-Math.floor(Math.random() * 4) -2};
    }

    function getNewRandomDot(maxWidth, maxHeight) {
        var o= {x: (Math.floor(Math.random() * maxWidth*0.9)),y: (Math.floor(Math.random() * maxHeight*0.9))};
        var center={x: canvas.width/2, y: canvas.height/2}
        while (calculateDistance(center, o) <= 2*(earthRadius+spaceshipRadius)){
            o.x = Math.floor(Math.random() * maxWidth*0.9);
            o.y = Math.floor(Math.random() * maxHeight*0.9);
        }
        return getNewDot(o.x,o.y);
    }
    function drawFire(from,angle) {
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(from.x+1000*Math.cos(angle/180*Math.PI), from.y+1000*Math.sin(angle/180*Math.PI));
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
        
    }
    function drawRange(){
        ctx.beginPath();
        ctx.arc(canvas.width/2,canvas.height/2,200,0,2*Math.PI);
        ctx.stroke();
    }
    function calculateDistance(from, to) {
        var xDistance = Math.abs(from.x - to.x);
        var yDistance = Math.abs(from.y - to.y);
        
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }
    function calcAngel(from,to){
        return Math.atan2(to.y - from.y, to.x - from.x)* 180 / Math.PI;
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawEarth();
        drawLauncher();
        drawRange();
        drawScore();
        drawHP();
        drawAngle();
        var curTime=new Date();
        if (fire){
            if ((curTime.getTime()-lastHit.getTime())<3000){
                fire=false;
            }
            else{
                lastHit=curTime;
            }  
        }

        objects.forEach(function(object, index, arr){
            
            var o=object;
            drawBall(o);
            if(calculateDistance(center, o) <= 200) {
                if(Math.abs(calcAngel(center,o)-angle)<=5){
                    
                    //hit the spaceship
                    drawLine(center,o,true);
                    arr.splice(index, 1);
                    score+=10;
                    return
                }
              
            }
            if(calculateDistance(center, o) <= (earthRadius+spaceshipRadius)) {
                hp-=10;
                arr.splice(index, 1);
                
            }
            
            object.x += o.xSpeed;
            object.y += o.ySpeed;
            
            if(object.x >= canvas.width-spaceshipRadius || object.x <= 0)
            {
                object.xSpeed *= -1;
            }
            
            if(object.y >= canvas.height-spaceshipRadius || object.y <= 0)
            {
                object.ySpeed *= -1;
            } 
               
        })
        if (rightPressed){
            angle+=5;
            totalAngle+=5;
        }
        if (leftPressed){
            angle-=5;
            totalAngle+=5;
        }
        drawFire(center,angle);
        if(hp===0) {
                var die=new Date();

                alert("GAME OVER! YOUR SCORE IS "+score+". YOU SURVIVED FOR "+ (die.getTime()-born.getTime())/1000+"s");
                document.location.reload();
            }
        
        
        requestAnimationFrame(draw);
    }
    draw();
    setInterval(function(){ objects.push(getNewRandomDot(canvas.width, canvas.height)) }, 1000);
}