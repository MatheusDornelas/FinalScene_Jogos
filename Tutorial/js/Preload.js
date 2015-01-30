var SpaceHipster = SpaceHipster || {};

//loading the game assets
SpaceHipster.Preload = function(){};

SpaceHipster.Preload.prototype = {
  preload: function() {
  	//show logo in loading screen

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

  	//load game assets
  	this.load.image('space', 'assets/images/space.png');
  	this.load.image('rock', 'assets/images/rock.png');
    this.load.spritesheet('playership', 'assets/images/player.png', 450, 100);
    this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
  	this.load.image('playerParticle', 'assets/images/player-particle.png');
    this.load.audio('collect', 'assets/audio/collect.ogg');
    this.load.audio('explosion', 'assets/audio/explosion.ogg');
  },
  create: function() {
  	//this.state.start('MainMenu');
    var teste;
    teste = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    teste.anchor.setTo(0.5);
    teste.animations.add('fly', [8, 2, 7, 9, 0, 11, 1, 14, 3, 12, 6, 13, 4, 10, 5], 2, true);
    teste.animations.play('fly');

    this.state.start('MainMenu');
  }
};