  var bird;
  var pipes = [];
  var backgroundimg;

  var birdIMG;
  var canvasWidth, canvasHeight;

  var pipesHit;
  var score;
  var gameState;
  var gameOverIMG,resetIMG;
  function preload() {

    backgroundimg = loadImage("bg1.jpg");
    //  pipesimg = loadImage("pipes.png");
    birdIMG = loadImage("bird.png");
    gameOverIMG = loadImage("Game_Over.png");
    resetIMG = loadImage("reset.png");
  }


  function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;

    createCanvas(canvasWidth, canvasHeight);
    bird = new Bird();
    pipes.push(new Pipe());
    score = 0;
    gameState = "play";
    pipesHit =0;
    

  }



  function draw() {
    background(backgroundimg);
    bird.update();
    bird.show();

    stroke(255,255,10);
    strokeWeight(10);
  


    if (frameCount % 120 == 0) {
      pipes.push(new Pipe());

    }

    if (frameCount % 160 === 0) {
    score = score + 1;

    }

    

    for (var i = pipes.length - 1; i >= 0; i--) {

      pipes[i].show();
      pipes[i].update();                 

      if (pipes[i].hits(bird)) {
        //console.log("ouch");
        pipesHit++;
      //score = score - 1 ;

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }

    }

    if( pipesHit > 45){
      gameState = "end";
    // console.log("END");
    }


    if (gameState === "end"){
    //pipes.speed = 0;
    // imageMode(CENTER);
      image(gameOverIMG,canvasWidth/2,100,300,50);
      image(resetIMG,canvasWidth/2,150,200,30);
      

    }

    push();
    fill(0);
    stroke(0,0,0);
  strokeWeight(1);
    textSize(20);
  text("Score: " +score ,canvasWidth*9/10,canvasHeight*0.5/10);
  pop();
  }



  }

  function keyPressed() {

    if (keyCode === 32 && gameState === "play") {  
      bird.up();
    }

  }


  function mousePressed(){

  if(gameState === "end" ){
    console.log(mouseX + "," +mouseY);  

    if(mouseX<640 && mouseX > 820){
      if(mouseY>154&&mouseY<177){
        gameState === "play";
        console.log("play");
      }
    
    }
  }

  }