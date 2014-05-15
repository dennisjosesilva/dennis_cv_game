var Sprite = Class.extend({
	image: null,	
	canvasContext: null,

	frame: {x: 0, y: 0, width: 0, height: 0},
	imageSize: {width: 0, height: 0},
	position: {x: 0, y: 0},	

	init: function(canvasContext, position){		
	},

	setUpObject: function(canvasContext, position){		
		this.position = position;
		this.canvasContext = canvasContext;
		this.image = ___GLOBAL___imageRepository.get("intro");
	},

	draw: function(){		
		this.canvasContext.drawImage(this.image, 
			this.frame.x, this.frame.y,
			this.frame.width, this.frame.height,
			this.position.x, this.position.y,
			this.imageSize.width, this.imageSize.height);			
	},	
	
});

var TheRecruiterSprite = Sprite.extend({
	frame: {x:0, y:0, width: 150, height: 204},
	imageSize: {width: 150, height: 204},	

	init: function(canvasContext, position){
		this.setUpObject(canvasContext, position);
	}
});

var TheExplosionSprite = Sprite.extend({
	frame: {x:0, y:217, width: 200, height: 110},
	imageSize: {width: 200, height: 110},

	init: function(canvasContext, position){
		this.setUpObject(canvasContext, position);
	}
});

var ThePrinterSprite = Sprite.extend({
	frame: {x:216, y:150, width: 345, height: 179},
	imageSize: {width: 345, height: 179},

	init: function(canvasContext, position){
		this.setUpObject(canvasContext, position);
	}
});

var ArrowKeysSprite = Sprite.extend({
	frame: {x: 346, y: 7, width: 91, height: 40},
	imageSize: {width: 91, height: 40},

	init: function(canvasContext, position){
		this.setUpObject(canvasContext, position);
	}
});

var SpacebarSprite = Sprite.extend({
	frame: {x: 344, y: 53, width: 91, height: 15},
	imageSize: {width: 91, height: 15},

	init: function(canvasContext, position){
		this.setUpObject(canvasContext, position);
	}
});

var AlarmClockSprite = Sprite.extend({
	frame: {x: 455, y: 4, width: 60, height: 60},
	imageSize: {width: 30, height: 30},

	init: function(canvasContext, position){
		this.setUpObject(canvasContext, position);
	}
});

var CVPartSprite = Sprite.extend({
	frame: {x: 523, y: 17, width: 68, height: 42},
	imageSize: {width: 34, height: 21},

	init: function(canvasContext, position){
		this.setUpObject(canvasContext, position);
	}
});

var IntroScene = Class.extend({
	sprites: [],
	canvasContext: null,

	draw: function(){
		for(sprite in this.sprites)
			this.sprites[sprite].draw();

		this.drawText();
		this.drawTextInstructions();
	},

	setUpObject: function(canvasContext, sprites){
		this.canvasContext = canvasContext;
		this.sprites = sprites;
	},
	
	drawText: function(){
		
	},

	setUpTextOnContext: function(){
		this.canvasContext.fillStyle = "#FFF";		
		this.canvasContext.font="12px Arial";
	},

	drawTextInstructions: function(){
		this.canvasContext.font = "10px Arial";
		this.canvasContext.fillText("Press 'Spacebar' to continue", 165, 135);		
		this.canvasContext.fillText("Press 'Enter' to skip all intro", 165, 145);		
	}

});



var FirstScene = IntroScene.extend({	
	init: function(canvasContext){
		this.setUpObject(canvasContext, [new TheRecruiterSprite(canvasContext, {x:0, y: 0})]);
	},

	drawText: function(){
		this.setUpTextOnContext();
		this.canvasContext.fillText("Oh! Great! It's lunch time", 135, 20);
		this.canvasContext.fillText("and I'm starving!", 135, 35);
		this.canvasContext.fillText("Everyone has already", 135, 50);
		this.canvasContext.fillText("gone to have a lunch", 135, 65);
		this.canvasContext.fillText("I just have to print this CV and", 135, 80);		
		this.canvasContext.fillText("I can go to eat!", 135, 95);		
		this.drawTextInstructions();
	}
});

var SecondScene = IntroScene.extend({
	init: function(canvasContext){
		this.setUpObject(canvasContext, [new TheRecruiterSprite(canvasContext, {x:0, y: 0})]);
	},

	drawText: function(){
		this.setUpTextOnContext();
		this.canvasContext.fillText("Tek!, Great, Now jus...", 135, 20);		
		this.drawTextInstructions();
	}
});

var ThirdScene = IntroScene.extend({		
	init: function(canvasContext){
		this.setUpObject(canvasContext, [new TheExplosionSprite(canvasContext, {x:0, y: 20})]);
	},

	drawText: function(){
		this.setUpTextOnContext();
		this.canvasContext.fillText("Ploft!!!!", 200, 70);		
		this.drawTextInstructions();
	}
});

var FourthScene = IntroScene.extend({	
	init: function(canvasContext){
		this.setUpObject(canvasContext, [new ThePrinterSprite(canvasContext, {x: -35, y: -50})]);
	},

	drawText: function(){
		this.setUpTextOnContext();
		this.canvasContext.fillText("Oh No! the printer", 190, 70);
		this.canvasContext.fillText("has broken", 190, 85);		
		this.drawTextInstructions();
	}
});

var FivethScene = IntroScene.extend({
	init: function(canvasContext){
		this.setUpObject(canvasContext, [new TheRecruiterSprite(canvasContext, {x:0, y: 0})]);
	},

	drawText: function(){
		this.setUpTextOnContext();
		this.canvasContext.fillText("and the CV has been" , 145, 20);		
		this.canvasContext.fillText("torn and spreaded", 145, 35);		
		this.drawTextInstructions();
	}
});

var SixthScene = IntroScene.extend({	
	init: function(canvasContext){
		this.setUpObject(canvasContext, [new TheRecruiterSprite(canvasContext, {x:0, y: 0})]);
	},

	drawText: function(){
		this.setUpTextOnContext();
		this.canvasContext.fillText("I must find out all CV parts" , 145, 20);		
		this.canvasContext.fillText("before the lunch time ends!", 145, 35);		
		this.drawTextInstructions();
	}
});

var SeventhScene = IntroScene.extend({
	init: function(canvasContext){
		this.setUpObject(canvasContext, [new ArrowKeysSprite(canvasContext, {x:15, y: 15}),
			new SpacebarSprite(canvasContext, {x: 10, y: 80})]);
	},	

	drawText: function(){
		this.setUpTextOnContext();
		this.canvasContext.fillText("Use the arrow keys on your" , 95, 30);	
		this.canvasContext.fillText("keyboard to move your character" , 95, 45);	
		this.canvasContext.fillText("Use spacebar key to collect", 110, 85); 
		this.canvasContext.fillText("the spreaded CV parts", 110, 100);		
		this.drawTextInstructions();
	}
});

var EighthScene = IntroScene.extend({
	init: function(canvasContext){
		this.setUpObject(canvasContext, [new AlarmClockSprite(canvasContext, {x:60, y: 10}),
			new CVPartSprite(canvasContext, {x: 220, y: 50 })]);
	},	

	drawText: function(){
		this.setUpTextOnContext();
		this.canvasContext.fillText("You have just 2 minutes" , 95, 30);	
		this.canvasContext.fillText("To collect all 5 CV parts" , 85, 65);	
		this.canvasContext.fillText("SO", 133, 100); 
		this.canvasContext.fillText("BE HURRY!", 110, 115);		
		this.drawTextInstructions();
	}
});

var IntroGameScene = GameScene.extend({
	scenes: [],
	currentScene: 0,
	context: null,
  
	init: function(canvas, gameInstance){
		___GLOBAL___imageRepository.add("intro", "img/intro.png");		

		this.gameInstance = gameInstance;
		this.canvas = canvas;
		this.gameInstance = gameInstance;
		this.context = this.canvas.getContext("2d");

		this.registerAllIntroScenes();
	},

	registerAllIntroScenes: function(){		
		this.scenes.push(new FirstScene(this.context));
		this.scenes.push(new SecondScene(this.context));		
		this.scenes.push(new ThirdScene(this.context));
		this.scenes.push(new FourthScene(this.context));
		this.scenes.push(new FivethScene(this.context));
		this.scenes.push(new SixthScene(this.context));
		this.scenes.push(new SeventhScene(this.context));
		this.scenes.push(new EighthScene(this.context));
	},

	update: function(){
		if(___GLOBAL___KeyboardInputMapper.isKeyPressed("action"))
			this.continueToNextScene();
		else if (___GLOBAL___KeyboardInputMapper.isKeyPressed("start"))
			this.finishIntro();
	},

	finishIntro: function(){
		this.gameInstance.setActiveGameScene(new StartScene(this.canvas, this.gameInstance));
	},

	continueToNextScene: function(){
		if(this.currentScene < this.scenes.length-1)
			this.currentScene++;
		else			
			this.finishIntro();
	},

	draw: function(){
		this.context.fillStyle = "#111";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.scenes[this.currentScene].draw();
	},

	onDeactive: function(){
		___GLOBAL___imageRepository.remove("intro");
	}
});