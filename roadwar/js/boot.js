var bootState = {
	preload: function(){
		game.load.image('progressBar','img/progressBar.png');
	},
	
	create: function(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.maxWidth = window.innerWidth;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.disableVisibilityChange = true;
		
	
		game.state.start('load');
	}
};
