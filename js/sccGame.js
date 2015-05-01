/**
 * sccGame.js
 * This JavaScript file is a template file that can be used to 
 * begin a new game using the Phaser engine (v2.2.2).
 * (c) 2015 Senn Coding Club
 */

	// the entirety of the game module should be wrapped in the window.onload() event
window.onload = function() {
	
	// GLOBAL VARIABLE SETUP
	// The HTML file that contains the game should have a
	// div element whose is "game"
var gameCanvas = document.getElementById("game");	// capture the canvas where the game is to be rendered

	// instantiate a new Phaser game
	// use the actual canvas width and height
	// set the background transparency to true and use the CSS file to adjust
var game = new Phaser.Game(600, 600, Phaser.AUTO, gameCanvas,{ preload: preload, create: create, render : render, update:update }, true);

                           
	/** 
	 * preload()
	 * This function is tied to the preload game state in the Phaser framework.
	 * It is called when the game first load.
	 * All of the assets (images, sounds, etc.), should be loaded here.
	 */
  var mainState = {
preload: function() {

    // load all game assets here
     game.stage.backgroundColor = "#71C5CF";
  		game.load.image('bird', 'images/bird.png');
  		game.load.image('pipe', 'images/pipe.png');

}

	/**
	 * create()
	 * This function is tied to the create game state in the Phaser framework.
	 * It is called when the game is first created. The initial game 
	 * should be rendered out here.
	 */
create: function() {
  		// create the game world here
  		 
  		// add the mainPC key as a sprite in the center of the game board
  		// anchor the sprite to the middle of the insertion point 0.5, 0.5
  		//
  		// physics and enabling it on the bird
	game.physics.startSystem(Phaser.Physics.ARCADE);
    this.bird=this.game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y= 1000;
    //player input
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    //pipes
    this.pipes = game.add.group();
    this.pipes.enableBody = true;
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
    this.score = 0;
    this.labelScore = game.add.text (20, 20, "0", {font:"30px Arial", fill: "#ffffff"});
}
  
	/**
	 * update()
	 * This function is tied to the update game state in the Phaser framework.
	 * It is called at 60 times per second. All the redraw happens within this area.
	 */
update: function() {
//failsafe against hackers--flying over pipes
  if(this.bird.inWorld == false){
    this.restartGame();
  }
  //flying into pipes restarts game
  game.physics.arcade.overlap(this.bird, this.pipe, this.restartGame, null, this);
}
  
jump: function (){
  	this.bird.body.velocity.y = -350;
}
 restartGame: function (){
   game.state.start('main');
 }
//start of the pipes
addOnePipe: function (x,y){
  var pipe = this.pipes.getFirstDead();
}
  	/**
  	 * render()
  	 * This function is tied to the render game state in the Phaser framework.
  	 * 
  	 */
render: function(){


}
  
};
