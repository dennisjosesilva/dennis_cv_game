/*------------------------- GAME SCENE ----------------------------------*/
var GameScene  = Class.extend({
	canvas: null,
	gameInstance: null,

	init: function(canvas, gameInstance){},
	draw: function(){},
	update: function(){},

	onDeactivate: function(){}
});


/*------------------------- IMAGE REPOSITORY ----------------------------------*/
var ImageRepository = Class.extend({
	images: {},

	init: function(){},

	add: function(idImage, urlImage){		
		var image = new Image();
		image.src = urlImage;
		image.onImageLoad = function(){};
		this.images[idImage] = image; 
	},

	get: function(idImage){
		return this.images[idImage];
	},

	remove: function(idImage){
		delete this.images[idImage];
	}
});
var ___GLOBAL___imageRepository = new ImageRepository();

function ___GLOBAL___gameLoop(){
	___GLOBAL___gameInstance.gameLoop();
}

function ___GLOBAL__setIntevalGameLoop(gameInstance, frameRate){
	___GLOBAL___gameInstance = gameInstance;
	return setInterval(___GLOBAL___gameLoop, frameRate);
}


/*------------------------- KEYBOARD INPUT MAPPER ----------------------------------*/
var KeyboardInputMapper = Class.extend({
	inputMapper: {},
	KeysPressed: {},

	init: function(){
		this.bindAllDepedencies();
	},

	bindAllDepedencies: function(){
		this.bindAllKeys();
		this.bindKeysPressed();
	},

	bindAllKeys: function(){
		this.inputMapper[40] = "walk_down";
		this.inputMapper[39] = "walk_right";
		this.inputMapper[38] = "walk_up";
		this.inputMapper[37] = "walk_left";
		
		//SPACEBAR
		this.inputMapper[32] = "action";
		//ENTER
		this.inputMapper[13] = "start";
	},

	bindKeysPressed: function (){
		for(var key in this.inputMapper)
			this.KeysPressed[this.inputMapper[key]] = false;
	},

	pressKey: function (key){		
		this.KeysPressed[this.inputMapper[key]] = true;		
	},

	releaseKey: function (key){		
		this.KeysPressed[this.inputMapper[key]] = false;	
	},

	isKeyPressed: function (key){		
		return this.KeysPressed[key];
	}
});

var ___GLOBAL___KeyboardInputMapper = new KeyboardInputMapper();


/*---------------------------- KEYBOARD EVENTS --------------------------*/
var ___GLOBAL___onKeyPress = function(evt) {	
	___GLOBAL___KeyboardInputMapper.pressKey(evt.keyCode);
};

var ___GLOBAL___onKeyRelease = function(evt) {
	___GLOBAL___KeyboardInputMapper.releaseKey(evt.keyCode);
};


/*------------------------- GAME ----------------------------------*/
var ___GLOBAL___gameInstance;

var Game = Class.extend({
	activeGameScene: null,
	isGameOver: false,
	frameRate: 111.111111111,
	intervalInstance: null,

	init: function() {				
		
	},

	setUpKeyboardEvents: function(){
		window.addEventListener("keydown", ___GLOBAL___onKeyPress, true);
		window.addEventListener("keyup", ___GLOBAL___onKeyRelease, true);			
	},

	setActiveGameScene: function(newGameScene){
		if(this.activeGameScene != null && this.activeGameScene != "undefined")
			this.activeGameScene.onDeactivate();

		this.activeGameScene = newGameScene;
	},

	start: function() {		
		this.intervalInstance = ___GLOBAL__setIntevalGameLoop(this, this.frameRate);
	},

	gameLoop: function() {
		if(!this.isGameOver)
		{
			this.activeGameScene.update();
			this.activeGameScene.draw();
		}
		else
			clearInterval(this.intervalInstance);
	}
});