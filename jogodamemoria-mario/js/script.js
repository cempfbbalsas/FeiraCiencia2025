(function(){
	var game = new Phaser.Game(400,400,Phaser.CANVAS);
		game.playSound = true;
		game.score = 0;
	
	var mainGame 	= new MainGame(game);
	var titleScreen = new TitleScreen(game);
	var gameOver 	= new GameOver(game);
	
	game.state.add('mainGame',mainGame);
	game.state.add('titleScreen',titleScreen);
	game.state.add('gameOver',gameOver);
	
	game.state.start('titleScreen');
}());
