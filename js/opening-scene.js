var OpeningScene = Class.extend({
	image: null,
	context: null,
	finalCount: 10,
	counter: 0,

	init: function (canvas, gamesInstance){
		___GLOBAL___imageRepository.add("opening", "img/printer-dennis-opening.png");

		this.canvas = canvas;
		this.gameInstance = gamesInstance;
		
		this.image = ___GLOBAL___imageRepository.get("opening");

		this.context = this.canvas.getContext("2d");
	},	

	update: function(){
		if(___GLOBAL___KeyboardInputMapper.isKeyPressed("start"))
			this.gameInstance.setActiveGameScene(new IntroGameScene(this.canvas, this.gameInstance));
	},

	draw: function(){
		
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);				
		this.context.drawImage(this.image, 0, 0, 400, 267, 15, -3, 220, 147);

		this.drawText();
	},

	drawText: function(){		
		this.setUpTextStyle();
		this.context.fillText("Press Enter to start", 213, 149);		
	},

	setUpTextStyle: function(){
		this.context.fillStyle = "#000";
		this.context.font = "10px Arial";
	},

	onDeactivate: function(){
		___GLOBAL___imageRepository.remove("opening");
	}	
});