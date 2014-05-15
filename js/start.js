var StartScene = GameScene.extend({
	image: null,
	context: null,
	finalCount: 10,
	counter: 0,

	init: function (canvas, gamesInstance){
		___GLOBAL___imageRepository.add("start", "img/StartScene.png");

		this.canvas = canvas;
		this.gameInstance = gamesInstance;
		
		this.image = ___GLOBAL___imageRepository.get("start");

		this.context = this.canvas.getContext("2d");
	},	

	update: function(){
		if(this.counter < this.finalCount)
			this.counter++;
		else			
			this.gameInstance.setActiveGameScene(new GamePlayScene(this.canvas, this.gameInstance));
	},

	draw: function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);				
		this.context.drawImage(this.image, 0, 0, 720, 480, 0, 0, 300, 150);
	},

	finishSplash: function(){
		this.isFinishedTime = true;
	}

});