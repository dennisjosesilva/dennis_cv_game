var context;

var Player = Class.extend({
	Animation: 
	{
		WALK_DOWN: 0, WALK_RIGHT: 1, WALK_UP: 2, WALK_LEFT: 3,
		IDLE_DOWN: 4, IDLE_RIGHT: 5, IDLE_UP: 6, IDLE_LEFT: 7
	},

	position: {x: 100, y: 50},
	previsePosition: {x: 100, y: 51},
	frameSize: {x: 20, y: 26},
	maxFrame: [8, 12, 11, 12, 1, 1, 1, 1],
	frameIndex: {x: 0, y: 1},
	spriteSize: {width: 20, height: 26},

	movementSpeed: 5,
	sprite: null,
	isColliding: false,

	init: function(){
		this.position = {x: 100, y: 50};
		this.previsePosition = {x: 100, y: 51};
		this.sprite = ___GLOBAL___imageRepository.get("player");
		this.frameIndex.y = this.Animation.IDLE_DOWN;
	},	

	getCollisionRect: function(){
		return new Rectangle(this.previsePosition.x, this.previsePosition.y, this.spriteSize.width, this.spriteSize.height - 10);
	},

	update: function(){				
		this.frameIndex.x = (this.frameIndex.x+1) % this.maxFrame[this.frameIndex.y];		

		if(!this.isColliding)
		{			
			this.position.x = this.previsePosition.x;
			this.position.y = this.previsePosition.y;		
		}		
		else
		{
			this.previsePosition.x = this.position.x;
			this.previsePosition.y = this.position.y;		
		}
	},

	calculateMovement: function(){
		this.calculateKeyPress();
	},

	calculateKeyPress: function (){		
		var oldAnimation = this.frameIndex.y;
		
		if(___GLOBAL___KeyboardInputMapper.isKeyPressed("walk_down"))
			this.moveDown();

		else if(___GLOBAL___KeyboardInputMapper.isKeyPressed("walk_up"))
			this.moveUp();

		else if(___GLOBAL___KeyboardInputMapper.isKeyPressed("walk_left"))
			this.moveLeft();

		else if(___GLOBAL___KeyboardInputMapper.isKeyPressed("walk_right"))
			this.moveRight();
		else
			this.frameIndex.y = this.getIdleFrameIndex(oldAnimation);
	},
	
	getIdleFrameIndex: function(odlAnimation){
		switch(odlAnimation)
		{
			case this.Animation.WALK_DOWN: case this.Animation.IDLE_DOWN:
				return this.Animation.IDLE_DOWN;
			case this.Animation.WALK_UP: case this.Animation.IDLE_UP:
				return this.Animation.IDLE_UP;
			case this.Animation.WALK_RIGHT: case this.Animation.IDLE_RIGHT:
				return this.Animation.IDLE_RIGHT;
			case this.Animation.WALK_LEFT: case this.Animation.IDLE_LEFT:
				return this.Animation.IDLE_LEFT;
		}
	},

	moveDown: function (){
		this.frameIndex.y = this.Animation.WALK_DOWN;				
		this.previsePosition.y += this.movementSpeed;
	},
	moveUp: function (){
		this.frameIndex.y = this.Animation.WALK_UP;
		this.previsePosition.y -= this.movementSpeed;
	},
	moveLeft: function (){
		this.frameIndex.y = this.Animation.WALK_LEFT;
		this.previsePosition.x -= this.movementSpeed;
	},
	moveRight: function () {
		this.frameIndex.y = this.Animation.WALK_RIGHT;		
		this.previsePosition.x += this.movementSpeed;
	},

	draw: function(){		
		context.drawImage(this.sprite, 
			this.spriteSize.width * this.frameIndex.x,
			this.spriteSize.height * this.frameIndex.y,
			this.frameSize.x, this.frameSize.y,
			this.position.x, this.position.y,
			this.frameSize.x, this.frameSize.y 
		);
	}
});


var GamePlayScene = GameScene.extend({
	player: null,
	isGameOver: false,
	tileset: null,
	background: null,
	cv: null,
	hud: null,

	init: function(canvas, gameInstance){
		___GLOBAL___imageRepository.add("player", "img/recruiter-sprite.png");
		___GLOBAL___imageRepository.add("background", "img/background.png");
		___GLOBAL___imageRepository.add("tileset", "img/tileset.png");

		this.canvas = canvas;
		this.gameInstance = gameInstance;

		this.tileset = new Tileset;
		context = this.canvas.getContext("2d");
		this.player = new Player();		
		this.background = new Background(context);		
		this.cv = new CV();
		this.hud = new HUD(this.canvas, this.cv);
	},

	update: function() {
		this.player.calculateMovement();		
		this.player.isColliding = this.tileset.verifyCollisionWith(this.player.getCollisionRect())
			|| this.isCollidingAgainstLevelLimits(this.player.previsePosition);		
		this.player.update();

		if(___GLOBAL___KeyboardInputMapper.isKeyPressed("action"))
			this.cv.checkIfPlayerHasPickAPartAndPickAPartIfItDoes(this.player.getCollisionRect());

		this.hud.update();

		if(this.hud.clock.getLunchTimeLeftInSeconds() < 0)
			this.gameInstance.setActiveGameScene(new NoMedalGameOverScene(this.canvas, this.gameInstance))

		if(this.hud.cv.cvsPartsRemaining() == 5)
			this.gameOver();
	},

	gameOver: function(){
		if(this.hud.clock.getLunchTimeLeftInSeconds() > 70)
			this.gameInstance.setActiveGameScene(new GoldMedalGameOverScene(this.canvas, this.gameInstance));
		else
			this.gameInstance.setActiveGameScene(new SilverMedalGameOverScene(this.canvas, this.gameInstance));
	},

	isCollidingAgainstLevelLimits: function (position){
		var verifyHorizontal = position.x < 0 || ((position.x + this.player.getCollisionRect().width) > this.canvas.width);
		var verifyVertical = position.y < 0 || ((position.y + this.player.getCollisionRect().height + 5) > this.canvas.height);
		return verifyVertical || verifyHorizontal;
	},

	draw: function () {
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);		
		this.background.draw();			
		this.tileset.drawFrontTiles();
		this.cv.draw();
		this.player.draw();
		this.tileset.drawBackTiles();		
		this.hud.draw();
	},

	onDeactivate: function(){
		this.hud.clearUp();
		___GLOBAL___imageRepository.remove("player");
		___GLOBAL___imageRepository.remove("background");
		___GLOBAL___imageRepository.remove("tileset");
	}
});