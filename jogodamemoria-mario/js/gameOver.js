var GameOver = function(game){
	this.game = game;
}

GameOver.prototype = {
	preload: function(){},
	
	create: function(){
		this.restart = false;
	
		var style = {
			font: '32px Monospace',
			fill: '#0f0',
			align: 'center'
		};
		
		var text = this.game.add.text(this.game.width/2, this.game.height/2, 'Game Over\n\nSua Pontuação: ' + this.game.score + '\n\nClick para Reiniciar',style);
			text.anchor.set(0.5);
			
		this.game.input.onDown.add(this.restartGame, this);
		
		this.game.time.events.add(Phaser.Timer.SECOND, function(){
			this.restart = true;
		}, this);
	},
	
	restartGame: function(){
		if(this.restart){
			this.game.state.start('titleScreen');
		}
	}
};
