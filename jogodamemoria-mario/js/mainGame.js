var MainGame = function(game){
	this.game = game;
	this.tileSize = 60;
	this.rows = 4;
	this.cols = 5;
	this.tileSpacing = 10;
	this.soundArray = [],
	this.txtScore = '';
	this.timeLeft = 0;
	this.txtTime = '';
	this.tilesLeft = 0;
};

MainGame.prototype = {
	preload: function(){
		this.game.load.spritesheet('tiles','img/tiles.jpg',this.tileSize,this.tileSize);
		this.game.load.audio('select','audio/select.mp3');
		this.game.load.audio('success','audio/success.mp3');
		this.game.load.audio('fail','audio/fail.mp3');
	},
	
	create: function(){
		this.tilesArray = [];
		this.selectedArray = [];
		this.game.score = 0;
		this.timeLeft = 60;
		this.placeTiles();
		var style = {
			font: '23px Monospace',
			fill: '#0f0',
			align: 'center'
		};
		
		this.txtScore = this.game.add.text(5,5,'Pontuação: ' + this.game.score, style);
		this.txtTime = this.game.add.text(5, this.game.height - 5, 'Tempo restante: ' + this.timeLeft, style);
		this.txtTime.anchor.set(0,1);
		this.game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
		
		if(this.game.playSound){
			this.soundArray[0] = this.game.add.audio('select',1);
			this.soundArray[1] = this.game.add.audio('success',1);
			this.soundArray[2] = this.game.add.audio('fail',1);
		}
	},
	
	placeTiles: function(){
		var leftSpace = (this.game.width - (this.tileSize * this.cols) - ((this.cols - 1) * this.tileSpacing))/2;
		var topSpace = (this.game.height - (this.tileSize * this.rows) - ((this.rows - 1) * this.tileSpacing))/2;
	
		for(var i = 0; i < this.rows * this.cols; i++){
			this.tilesArray.push(Math.floor(i/2));
		}
		
		for(var i = 0; i < this.rows * this.cols; i++){
			var from = this.game.rnd.between(0,this.tilesArray.length -1);
			var to = this.game.rnd.between(0,this.tilesArray.length -1);
			var temp = this.tilesArray[from];
			this.tilesArray[from] = this.tilesArray[to];
			this.tilesArray[to] = temp;
		}
	
		for(var i = 0; i < this.cols; i++){
			for(var j = 0; j < this.rows; j++){
				var tile = this.game.add.button(leftSpace + i * (this.tileSize + this.tileSpacing), 
												topSpace + j * (this.tileSize + this.tileSpacing), 
												'tiles', 
												this.showTile,
												this);
					tile.frame = 10;
					tile.value = this.tilesArray[j * this.cols + i];
			}
		}
		
		this.tilesLeft = (this.rows * this.cols);
	},
	
	showTile: function(target){
		if(this.selectedArray.length < 2 && this.selectedArray.indexOf(target) < 0){
			if(this.game.playSound){
				this.soundArray[0].play();
			}
		
			target.frame = target.value;
			this.selectedArray.push(target);
			if(this.selectedArray.length === 2){
				this.checkTiles();
			}
		} 
	},
	
	checkTiles: function(){
		if(this.selectedArray[0].value === this.selectedArray[1].value){
			this.game.score++;
			this.timeLeft += 2;
			this.txtTime.text = 'Tempo restante: ' + this.timeLeft;
			this.game.time.events.add(Phaser.Timer.SECOND, this.clearTiles, this);
		} else {
			this.game.time.events.add(Phaser.Timer.SECOND, this.turnTiles, this);
		}
	},
	
	turnTiles: function(){
		if(this.game.playSound){
			this.soundArray[2].play();
		}
		this.selectedArray[0].frame = 10;
		this.selectedArray[1].frame = 10;
		this.selectedArray = [];
	},
	
	clearTiles: function(){
		if(this.game.playSound){
			this.soundArray[1].play();
		}
		this.txtScore.text = 'Pontuação: ' + this.game.score;
		this.selectedArray[0].destroy();
		this.selectedArray[1].destroy();
		this.selectedArray = [];
		this.tilesLeft -= 2;
		if(this.tilesLeft <= 0){
			this.tilesArray = [];
			this.placeTiles();
		}
	},
	
	decreaseTime: function(){
		this.timeLeft--;
		this.txtTime.text = 'Tempo Restante: ' + this.timeLeft;
		if(this.timeLeft === 0){
			this.game.state.start('gameOver');
		}
	}
	
};
