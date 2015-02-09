SpaceHipster.MainMenu = function(){};
SpaceHipster.MainMenu.prototype = {
  create: function() {
  	//show the space tile, repeated
    this.background = this.game.add.sprite(0, 0,'backMenu');
    this.background.height = this.game.height;
    this.background.width = this.game.width;
    //give it speed in x
    //this.background.autoScroll(-20, 0);

    title = this.game.add.sprite(this.game.world.centerX-237, 100,'title');

    play = this.game.add.sprite(this.game.world.centerX-70, this.game.world.centerY + 100,'buttonPlay');
    play.anchor.set(0.5);
    play.inputEnabled = true;
    play.events.onInputDown.add(this.beginGame, this);
    
/*    //start game text
    var text = "Jogar";
    var style = { font: "30px Calibri", fill: "#fff", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);

    //highest score
    text = "Highest score: "+this.highestScore;
    style = { font: "15px Arial", fill: "#fff", align: "center" };
  
    var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
    h.anchor.set(0.5);
    */
  },
  beginGame: function(){
    this.game.state.start('Game');
  }
};