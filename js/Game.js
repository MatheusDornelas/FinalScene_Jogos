var SpaceHipster = SpaceHipster || {};

    var building1;
    var building2;
//title screen
SpaceHipster.Game = function(){

};
  
SpaceHipster.Game.prototype = {
  create: function() {
  	//set world dimensions
	this.game.world.setBounds(0, 0, 800, 600);
	this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
  this.background.autoScroll(0,-50);

	//create player
	this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
	this.player.scale.setTo(4);

	this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
	this.player.animations.play('fly');

	//player initial score of zero
	this.playerScore = 0;

	//enable player physics
	this.game.physics.arcade.enable(this.player);
	this.playerSpeed = 120;
	this.player.body.collideWorldBounds = true;
  this.player.body.bounce.setTo(0.7, 0.7);
  this.BoolParedePlayer1 = false;
  //create 2nd player
  this.player2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY , 'enemy');
  this.player2.scale.setTo(4);

  
  this.player2.animations.add('fly', [0, 1, 2, 3], 5, true);
  this.player2.animations.play('fly');
  
  //bbbb
  //player initial score of zero
  this.player2Score = 0;

  //enable player physics
  this.game.physics.arcade.enable(this.player2);
  this.playerSpeed = 120;
  this.player2.body.collideWorldBounds = true;
  this.player2.body.bounce.setTo(0.7, 0.7);
  this.BoolParedePlayer2 = false;



	//the camera will follow the player in the world
	this.game.camera.follow(this.player);

  //timer = this.game.time.create(false);

  this.building = this.game.add.group();
  this.building.enableBody = true;
 // this.building.setAll('body.collideWorldBounds', true);
  this.building.physicsBodyType = Phaser.Physics.ARCADE;
  this.game.physics.arcade.enable(this.building);

  //Explosão do teto
  this.exp = this.game.add.group();
  this.exp.enableBody = true;
  this.exp.physicsBodyType = Phaser.Physics.ARCADE;
  //this.exp.body.immovable = true;

  this.fogoTeto();
  this.generateBuilding();
  this.generateBuilding2();

		//sounds
	this.explosionSound = this.game.add.audio('explosion');
	this.collectSound = this.game.add.audio('collect');
  
  this.rock = this.game.add.group();
  this.rock.enableBody = true;
  this.rock.physicsBodyType = Phaser.Physics.ARCADE;
  this.game.physics.arcade.enable(this.rock);

  this.game.time.events.add(Phaser.Timer.SECOND * 5, this.endGame, this);

  },
  update: function() {

  //this.generateBuilding();
  /*
    if(this.game.input.activePointer.justPressed()) {
      
      //move on the direction of the input
      this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
    }

  */

  //movimento dos jogadores
  this.movimentoPlayer(); 
  //colisao com a parede
  this.colisaoParede();
  //criar rochas e powerups
  this.createRocksAndPowerUps();
  this.game.physics.arcade.collide(this.player, this.rock, this.hitRock, null, this);
  this.game.physics.arcade.collide(this.player2, this.rock, this.hitRock, null, this);
  this.game.physics.arcade.collide(this.player2, this.player);
  this.game.physics.arcade.collide(this.player2, this.exp, this.matarPlayer, null, this);
  this.game.physics.arcade.collide(this.player, this.exp, this.matarPlayer, null, this);


  },
  generateBuilding: function() {
    var numBuildings = 100;
    var j = 0;
  for (var i = 0; i<numBuildings; i++) {

      building1 = this.building.create(0, j, 'building', this.game.rnd.integerInRange(0, 3));
      building1.scale.setTo(0.4);

      j = j + 93;

      building1.body.immovable = true;
      building1.body.velocity.y = -50;
      building1.body.collideWorldBounds = false;
    }
  },
  generateBuilding2: function() {
    var numBuildings = 100;
    var g = -3;
    for(var i = 0; i<numBuildings; i++){

      building2 = this.building.create(this.game.world.width-205, g, 'building2', this.game.rnd.integerInRange(0, 3));
      building2.scale.setTo(0.4);

      g = g + 94;

      building2.body.immovable = true;
      building2.body.velocity.y = -50;
      building2.body.collideWorldBounds = false;
    }
  },
  /*generateAsteriods: function() {
    this.asteroids = this.game.add.group();
    
    //enable physics in them
    this.asteroids.enableBody = true;
    this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

    //phaser's random number generator
    var numAsteroids = this.game.rnd.integerInRange(150, 200)
    var asteriod;

    for (var i = 0; i < numAsteroids; i++) {
      //add sprite
      asteriod = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
      asteriod.scale.setTo(this.game.rnd.integerInRange(10, 40)/10);

      //physics properties
      asteriod.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
      asteriod.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
      asteriod.body.immovable = true;
      asteriod.body.collideWorldBounds = true;
    }
  },
  */
   colisaoParede: function() {
      //boolean player2Alive = ;
      if(this.player.x <= 200 && (this.player.alive)){
        this.hitParede(this.player,this.BoolParedePlayer1);
      }else if(this.player.x >= 578 && (this.player.alive)){
        this.hitParede(this.player,this.BoolParedePlayer1);
      }


      if( (this.player2.x <= 200) && (this.player2.alive) ){
        this.hitParede(this.player2, this.BoolParedePlayer2);
      }else if(this.player2.x >= 578 && (this.player2.alive)  ){
        this.hitParede(this.player2,this.BoolParedePlayer2);
      }

  
  },
  movimentoPlayer: function(){
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
          { 
                this.player2.body.velocity.x -= 4;
              
              this.player2.angle = -15;
              if(this.player2.x<=201 || this.player2.x>= 579){
                this.BoolParedePlayer2 = false;
              }
              //leftBtn.alpha = 0.6;
          }
      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
          {
                this.player2.body.velocity.x += 4;
              if(this.player2.x<=201 || this.player2.x>= 579){
                this.BoolParedePlayer2 = false;
              }
              this.player2.angle = 15;
              //rightBtn.alpha = 0.6; 
      }else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
          {
           
              this.player2.body.velocity.y = 70;
            
              
            
              this.player2.angle = 15;
              //rightBtn.alpha = 0.6;
      }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)){
              this.player2.body.velocity.y -= 2;
              this.player2.angle = 15;
              
      }else{
            
        this.playerParando(this.player2);
            
      }
       if(this.player2.y > 350){
         this.player2.body.velocity.y = 0;
       }


      if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
          {
              this.player.body.velocity.x -= 4;
              this.player.angle = -15;
              if(this.player.x>200 && this.player.x< 578){
              this.BoolParedePlayer1 = false;
              }
              //leftBtn.alpha = 0.6;
          }
          else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
          {
              this.player.body.velocity.x += 4;
              this.player.angle = 15; 
              if(this.player.x>200 && this.player.x< 578){
              this.BoolParedePlayer1 = false;
              }
          }else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
          { 
           
              this.player.body.velocity.y = 70;
              this.player.angle = 15;
          }else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
          {
              this.player.body.velocity.y -= 2;
              this.player.angle = 15;
          }
          else
          {
            this.playerParando(this.player);
      }
      if(this.player.y > 350){  
          this.player.body.velocity.y = 0;
      }    
    },
  
  hitParede: function(player, tocouParede) {
    //play explosion sound
    
    if(!tocouParede){
     // player.x = 200;
     tocouParede = true;
     player.body.velocity.x = 0;
      player.body.velocity.y = -100;
    }else{
     // player.x = 577;
     tocouParede = true;
      player.body.velocity.y = -100;
    }

    //make the player explode
    var emitter = this.game.add.emitter(player.x, player.y, 100);
    emitter.makeParticles('playerParticle');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;
    emitter.start(true, 1000, null, 10);
    
    //player.destroy();

    //call the gameOver method in 800 milliseconds, we haven't created this method yet
    //this.game.time.events.add(800, this.gameOver, this);
  },

  hitRock: function(player, rock) {
    console.log(rock);
    player.y -= 5;
    
  },
  matarPlayer: function(player) {
    console.log(player.alive);
    player.kill();
    
  },
  playerParando: function(player) {
    if(player.body.velocity.x >0 ){
              player.body.velocity.x =Math.round(player.body.velocity.x*0.95);  
              player.rotation = 0;
    }else if(player.body.velocity.x < 0){
      player.body.velocity.x =Math.round(player.body.velocity.x * 0.95);  
      player.rotation = 0;
    }else{
      player.rotation = 0;
    }

    if(player.body.velocity.y >0 ){
              player.body.velocity.y =Math.round(player.body.velocity.y*0.95);  
              player.rotation = 0;
    }else if(player.body.velocity.x < 0){
      player.body.velocity.y =Math.round(player.body.velocity.y *0.95);  
      player.rotation = 0;
    }else{
      player.rotation = 0;
    }
    
  },
  fogoTeto: function() {
    
    var x = 590;
    var y = -80;

    for(var i = 0; i<6; i++){
      
      var explosion1 = this.exp.create(x, y, 'fogoTeto');
      var rnd = Math.round((Math.random()*24 + 1));
      //[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
      var arrayC = [(rnd%24),((rnd+1)%24),((rnd+2)%24),((rnd+3)%24),((rnd+4)%24),((rnd+5)%24),((rnd+6)%24),((rnd+7)%24),((rnd+8)%24)];
      //console.log(arrayC)
      explosion1.animations.add('fire',arrayC, 10, true);
      //explosion1.animations.add('fire', , 10, true);
      
      //
      explosion1.animations.play('fire');
      explosion1.scale.setTo(3);
      //this.game.physics.arcade.enable(explosion1);
      explosion1.body.immovable = true;
      x = x - 125;
    }
  },
  createRocksAndPowerUps: function() {
   // asteriod = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
    var rnd = this.game.rnd.integerInRange(0,100);
    var rndPowerUp = this.game.rnd.integerInRange(0,500);
    // predio esquerda = 200
    // predio direita = 578
    var positionX = this.game.rnd.integerInRange(50, 700);
    var positionXpowerup = this.game.rnd.integerInRange(220, 550);

    if(rnd == 100) {
      //create rock
      var rock;
      rock = this.rock.create(positionX, 0, 'rock');
      rock.animations.add('roll', null, 10, true);
      rock.animations.play('roll');
      rock.scale.setTo(this.game.rnd.integerInRange(1, 2)/10);

      //physics properties
      rock.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
      rock.body.velocity.y = this.game.rnd.integerInRange(50, 100);
      rock.body.immovable = true;
      rock.body.collideWorldBounds = false;
    }

    if(rndPowerUp == 100) {
      //create powerup
      this.powerup = this.game.add.sprite(positionXpowerup, 50, 'powerup');
      this.powerup.scale.setTo(0.2);
      this.game.physics.arcade.enable(this.powerup);
      this.powerup.body.velocity.y = 200;

    }

  },
  endGame: function() {

    var playerVencedor;

    if(this.player.y > this.player2.y) {
      // player 1 venceu
      playerVencedor = "Player 1";
    } else {
      // player 2 venceu
      playerVencedor = "Player 2";
    }

    this.state.start('Endgame', true, false, playerVencedor);
  },
};