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
	this.player.scale.setTo(2);

	this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
	this.player.animations.play('fly');

	//player initial score of zero
	this.playerScore = 0;

	//enable player physics
	this.game.physics.arcade.enable(this.player);
	this.playerSpeed = 120;
	this.player.body.collideWorldBounds = true;
  this.player.body.bounce.setTo(0.7, 0.7);

  //create 2nd player
  this.player2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY , 'enemy');
  this.player2.scale.setTo(2);

  
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
 // this.building.setAll('body.collideWorldBounds', true);
  this.rock.physicsBodyType = Phaser.Physics.ARCADE;
  this.game.physics.arcade.enable(this.rock);



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
  //this.game.physics.arcade.collide(this.player, this.exp, this.hitAsteroid, null, this);
  //this.game.physics.arcade.collide(this.player2, this.exp, this.hitAsteroid, null, this);
  //this.game.physics.arcade.collide(this.player2, this.exp, this.hitAsteroid, null, this);
	//this.game.physics.arcade.collide(this.player, this.building, this.hitAsteroid, null, this);
  //this.game.physics.arcade.collide(this.player, this.exp, this.hitAsteroid, null, this);

  },
  generateBuilding: function() {


    var numBuildings = 100;

    var j = 0;
    var g = 0;

  for (var i = 0; i<numBuildings; i++) {

      building1 = this.building.create(0, j, 'building', this.game.rnd.integerInRange(0, 3));
      //building2 = this.building.create(this.game.world.width-205, 30, 'building2', this.game.rnd.integerInRange(0, 3));
      building1.scale.setTo(0.4);
      //building2.scale.setTo(0.4);
      j = j + 93;
      //g = g + (246);
      
      building1.body.immovable = true;
      building1.body.velocity.y = -50;
      building1.body.collideWorldBounds = false;

      //building2.body.velocity.y = -50;
      //building2.body.collideWorldBounds = false;
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
      if( (this.player2.x <= 200) && (this.player2.alive) ){
        this.hitParede(this.player2);
      }else if(this.player2.x >= 578 && (this.player2.alive)  ){
        this.hitParede(this.player2);
      }
      if(this.player.x <= 200 && (this.player.alive)){
        this.hitParede(this.player);
      }else if(this.player.x >= 578 && (this.player.alive)){
        this.hitParede(this.player);
      }
  
  },
  movimentoPlayer: function(){
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
          { 
              if(this.player2.body.velocity.x >= -300){
                this.player2.body.velocity.x -= 5;
              }
              this.player2.angle = -15;
              //leftBtn.alpha = 0.6;
          }
          else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
          {
              if(this.player2.body.velocity.x <= 300){
                this.player2.body.velocity.x += 10;
              }
              this.player2.angle = 15;
              //rightBtn.alpha = 0.6; 
          }else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
          {
              this.player2.body.velocity.y += 4;
              this.player2.angle = 15;
              //rightBtn.alpha = 0.6;
          }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)){
              this.player2.body.velocity.y -= 4;
              this.player2.angle = 15;
              
          }else
          {
            this.player2.body.velocity.x = 0;  
            this.player2.rotation = 0;
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
          {
              this.player.body.velocity.x -= 4;
              this.player.angle = -15;
              //leftBtn.alpha = 0.6;
          }
          else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
          {
              this.player.body.velocity.x += 4;
              this.player.angle = 15; 
          }else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
          {
              this.player.body.velocity.y += 4;
              this.player.angle = 15;
          }
          else
          {
            this.player2.rotation = 0;
      }      
    },
  
  hitParede: function(player) {
    //play explosion sound
    
    if(player.x<= 201 ){
      player.x = 200;
      player.y-= 3;
    }else{
      player.x=578;
      player.y-=3;
    }
    //make the player explode
    var emitter = this.game.add.emitter(player.x, player.y, 100);
    emitter.makeParticles('playerParticle');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;
    emitter.start(true, 1000, null, 100);
    
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
  fogoTeto: function() {
    
    var x = -70;
    var y = -80;

    for(var i = 0; i<6; i++){
      
      var explosion1 = this.exp.create(x, y, 'fogoTeto');
      var rnd = this.game.rnd.integerInRange(0, 24);
      //[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
      explosion1.animations.add('fire', [rnd, (rnd+1), (rnd+2), (rnd+3),(rnd+4),(rnd+5),(rnd+6)], 10, true);
      //
      explosion1.animations.play('fire');
      explosion1.scale.setTo(4);
      //this.game.physics.arcade.enable(explosion1);
      explosion1.body.immovable = true;
      x = x + 125;
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
      rock = this.rock.create(positionX, 50, 'rock');
      rock.scale.setTo(this.game.rnd.integerInRange(10, 20)/10);

      //physics properties
      rock.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
      rock.body.velocity.y = this.game.rnd.integerInRange(50, 100);
      rock.body.immovable = true;
      rock.body.collideWorldBounds = false;
      
      //this.game.physics.arcade.enable(this.rock);
      //this.rock.body.velocity.y = 100;

    }

    if(rndPowerUp == 100) {
      //create powerup
      this.powerup = this.game.add.sprite(positionXpowerup, 50, 'powerup');
      this.powerup.scale.setTo(0.2);
      this.game.physics.arcade.enable(this.powerup);
      this.powerup.body.velocity.y = 200;

    }

    },
};