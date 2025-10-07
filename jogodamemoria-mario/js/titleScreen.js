var TitleScreen = function(game){
	this.game = game;
}

TitleScreen.prototype = {
	preload: function(){
		this.game.load.spritesheet('soundIcons','img/soundIcons.png',80,80);
	},
	
	create: function(){
		this.game.pageAlignHorizontally = true;
		this.game.pageAlignVertically = true;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	
		this.game.disableVisibilityChange = true;
	
		var style = {
			font: '42px Monospace',
			fill: '#0f0',
			align: 'center'
		};
		
		var text = this.game.add.text(this.game.width/2, this.game.height/2 - 100, 'Com ou Sem Som', style);
			text.anchor.set(0.5);
		
		var soundButton = this.game.add.button(this.game.width/2 - 100, this.game.height/2 + 100, 'soundIcons', this.startGame, this);
			soundButton.frame = 0;
			soundButton.anchor.set(0.5);
			
			soundButton = this.game.add.button(this.game.width/2 + 100, this.game.height/2 + 100, 'soundIcons', this.startGame, this);
			soundButton.frame = 1;
			soundButton.anchor.set(0.5);
	},
	
	startGame: function(target){
		if(target.frame === 0){
			this.game.playSound = true;
		} else {
			this.game.playSound = false;
		}
		this.game.state.start('mainGame');
	}
};
