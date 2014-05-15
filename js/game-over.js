var GameOverScene = GameScene.extend({	
	context: null,
	hasButtonPressed: null,

	setUpObject: function(gameInstance, canvas){
		this.hasButtonPressed = false;
		this.gameInstance = gameInstance;
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
	},

	openPDFDocument: function(path){
		window.open(path);		
	},

	setUpTextStyle: function(){
		this.context.fillStyle = "#555555";		
		this.context.font= "10px Arial";
	},

	drawText: function(){ /*pure virtual */ },

	update: function(){},

	draw: function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);		
		this.drawText();
	}
});

var GoldMedalGameOverScene = GameOverScene.extend({
	init: function(canvas, gameInstance){
		this.setUpObject(gameInstance, canvas);		
	},

	update: function() {				
		if(this.hasButtonPressed)
		{
			this.openPDFDocument("pdf/Dennis_cv_goldMedal.pdf");
			this.hasButtonPressed = false;
		}

		if(___GLOBAL___KeyboardInputMapper.isKeyPressed("start"))
			this.hasButtonPressed = true;
	},

	drawText: function(){
		this.setUpTextStyle();
		this.context.fillText("Congratulations! you've found the entire CV in", 35, 35);
		this.context.fillText("a short time and now you can go to have lunch." , 35, 50);
		this.context.fillText("Bon Appetit!" , 195, 80);
		this.context.fillText("Press Enter to take your CV copy" , 145, 148);		
	}
});

var SilverMedalGameOverScene = GameOverScene.extend({
	init: function(canvas, gameInstance){
		this.setUpObject(gameInstance, canvas);		
	},

	update: function() {				
		if(this.hasButtonPressed)
		{
			this.openPDFDocument("pdf/Dennis_cv_silverMedal.pdf");
			this.hasButtonPressed = false;
		}

		if(___GLOBAL___KeyboardInputMapper.isKeyPressed("start"))
			this.hasButtonPressed = true;
	},

	drawText: function(){
		this.setUpTextStyle();
		this.context.fillText("Congratulations! you've found the entire CV but", 25, 35);
		this.context.fillText("you don't have time to have lunch, just take a snack" , 25, 50);
		this.context.fillText("and enjoy the rest of the day." , 25, 65);
		this.context.fillText("Press Enter to take your CV copy" , 145, 148);		
	}
});

var NoMedalGameOverScene = GameOverScene.extend({
		init: function(canvas, gameInstance){
		this.setUpObject(gameInstance, canvas);		
	},

	update: function() {				
		if(this.hasButtonPressed)
			this.gameInstance.setActiveGameScene(new StartScene(this.canvas, this.gameInstance));

		if(___GLOBAL___KeyboardInputMapper.isKeyPressed("start"))
			this.hasButtonPressed = true;
	},

	drawText: function(){
		this.setUpTextStyle();
		this.context.fillText("Oh No! You haven't found the entire CV, time to face", 25, 35);
		this.context.fillText("your boss." , 25, 50);
		this.context.fillText("Good Luck!." , 185, 80);

		this.context.fillText("But do't worry it is just a game." , 145, 135);		
		this.context.fillText("Press Enter to restart the game" , 145, 148);		
	}
});