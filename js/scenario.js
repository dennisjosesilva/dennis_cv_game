/*-------------- RECTANGLE --------------------------------------------------------------------------- */
var Rectangle = Class.extend({
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	
	init: function(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	},

	left: function() { return this.x; },
	top: function() { return this.y; },
	right: function() { return this.x + this.width; },
	bottom: function() { return this.y + this.height; },

	isIntersected: function(otherRectangle){
		return !((this.right() < otherRectangle.left()) || 
			(this.left() > otherRectangle.right()) ||
			(this.bottom() < otherRectangle.top()) ||
			(this.top() > otherRectangle.bottom()));
	}
});


/*-------------- TILE ---------------------------------------------------------------------------- */
var Tile = Class.extend({
	frame: {x: 0, y: 0, width: 0, height: 0},	
	position: {x: 0, y: 0},
	imageSize: {width: 0, height: 0},
	collisionRect: {},

	imageUrl: "img/tileset.png",
	image: null,

	setUpObject: function(position){
		this.position = position;		
		this.setUpImage();
	},

	setUpImage: function (){
		this.image = ___GLOBAL___imageRepository.get("tileset");
	},	

	draw: function () {
		context.drawImage(this.image, 
			this.frame.x, this.frame.y,
			this.frame.width, this.frame.height,
			this.position.x, this.position.y,
			this.imageSize.width, this.imageSize.height);
	}
});

/*-------------- COMPOSITE TILE ---------------------------------------- */
var CompositeTile = Class.extend({
	addMeToTileSet: function (tileset, position){}
});


/*-------------- COMPUTER ---------------------------------------- */
var ComputerTopPart = Tile.extend({
	frame: {x: 0, y: 0, width: 65, height: 25.5},
	imageSize: {width: 32, height: 12.5},
	
	init: function(position){
		this.setUpObject(position);
		this.collisionRect = new Rectangle(position.x + 4, position.y + 5, this.imageSize.width - 10, 1);
	}	
});


var ComputerBottomPart = Tile.extend({
	frame: {x: 0, y: 25.5, width: 65, height: 25.5},
	imageSize: {width: 32, height: 12.5},
	
	init: function(position){
		this.setUpObject(position);
		this.collisionRect = new Rectangle(0, 0, 0, 0);
	}	
});

var Computer = CompositeTile.extend({
	topPart: {},
	bottomPart: {},

	init: function (position){
		var bottomPosition = {x: 0, y: 0};
		this.topPart = new ComputerTopPart(position);
		
		bottomPosition.x = position.x;
		bottomPosition.y = position.y + this.topPart.imageSize.height;
		this.bottomPart = new ComputerBottomPart(bottomPosition);
	},

	addMeToTileSet: function(tileset){
		tileset.pushASimpleTileOnBackTiles(this.topPart);
		tileset.pushASimpleTileOnFrontTiles(this.bottomPart);
	}
});


/*-------------- CHAIR ---------------------------------------- */
var Chair = Tile.extend({
	frame: {x: 39, y: 79, width: 27, height: 34},
	imageSize: {width: 16, height: 20},

	init: function(position){
		this.setUpObject(position);
		this.collisionRect = new Rectangle(this.position.x + 7, this.position.y, this.imageSize.width - 12, this.imageSize.height - 20);
	}
});


/*-------------- RUBISHBIN ---------------------------------------- */
var RubbishBin = Tile.extend({
	frame: {x: 175, y: 11, width: 15, height: 34},
	imageSize: {width: 10, height: 19},

	init: function(position){
		this.setUpObject(position);
		this.collisionRect = new Rectangle(position.x, position.y - 5, this.frame.width - 15, 1);
	}
});

/*-------------- DOOR ---------------------------------------- */
var Door = Tile.extend({
	frame: {x: 36, y: 116, width: 29, height: 39},
	imageSize: {width: 20, height: 21}, 

	init: function(position){
		this.setUpObject(position);
		this.collisionRect = new Rectangle(0, 0, 0, 0);
	}
});

/*-------------- CABINET ---------------------------------------- */
var Cabinet = Tile.extend({
	frame: {x: 76, y: 0, width: 32, height: 44},
	imageSize: {width: 19, height: 26},

	init: function(position){
		this.setUpObject(position);
		this.collisionRect = new Rectangle(position.x, position.y, this.imageSize.width, 5);
	}
});

/*-------------- PRINTER TABLE ---------------------------------------- */
var PrinterTable = Tile.extend({
	frame: {x: 74, y: 45, width: 71, height: 51},
	imageSize: {width: 43, height: 31},

	init: function(position){
		this.setUpObject(position);
		this.collisionRect = new Rectangle(position.x + 5, position.y, this.imageSize.width - 10, 5)
	}
});

/*-------------- PICTURE ---------------------------------------- */
var Picture = Tile.extend({
	frame: {x: 199, y: 17, width: 28, height: 31},
	imageSize: {width: 16, height: 16 },

	init: function(position){
		this.setUpObject(position);
		this.collisionRect = new Rectangle(0, 0, 0, 0);
	}
});

/*-------------- TILESET ---------------------------------------- */
var Tileset = Class.extend({
	frontTiles: [],
	backTiles: [],

	init: function (){
		this.pushACompositeTile(new Computer({x: 28, y: 45}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 30, y: 65}));

		this.pushACompositeTile(new Computer({x: 60, y: 45}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 62, y: 65}));

		this.pushACompositeTile(new Computer({x: 117, y: 45}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 119, y: 65}));

		this.pushACompositeTile(new Computer({x: 149, y: 45}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 151, y: 65}));

		this.pushACompositeTile(new Computer({x: 207, y: 45}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 211, y: 65}));

		this.pushACompositeTile(new Computer({x: 238, y: 45}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 240, y: 65}));

		/*-------------- CABINETS ------------------- */
		this.pushASimpleTileOnFrontTiles(new Cabinet({x: 280, y: 0}));
		this.pushASimpleTileOnFrontTiles(new Cabinet({x: 261, y: 0}));

		/* ----------- RUBBISH BINS ------------------ */

		this.pushASimpleTileOnFrontTiles(new RubbishBin({x: 270, y: 55}));
		this.pushASimpleTileOnFrontTiles(new RubbishBin({x: 270, y: 110}));

		/* ------------- CHAIRS DOWN --------------------*/

		this.pushACompositeTile(new Computer({x: 28, y: 100}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 30, y: 120}));

		this.pushACompositeTile(new Computer({x: 60, y: 100}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 62, y: 120}));

		this.pushACompositeTile(new Computer({x: 117, y: 100}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 119, y: 120}));

		this.pushACompositeTile(new Computer({x: 149, y: 100}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 151, y: 120}));

		this.pushACompositeTile(new Computer({x: 207, y: 100}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 211, y: 120}));

		this.pushACompositeTile(new Computer({x: 238, y: 100}));
		this.pushASimpleTileOnFrontTiles(new Chair({x: 240, y: 120}));	

		/*------------------ DOOR ---------------------------------*/
		this.pushASimpleTileOnFrontTiles(new Door({x: 200, y: 0}));

		/*------------- PRINTER TABLE -----------------------------*/
		this.pushASimpleTileOnFrontTiles(new PrinterTable({x:20, y: 3}));

		/*-------------- PICTURE ----------------------------------------*/
		this.pushASimpleTileOnFrontTiles(new Picture({x: 100, y: 0}));
	},	

	pushASimpleTileOnBackTiles: function(tile){
		this.backTiles.push(tile);
	},

	pushASimpleTileOnFrontTiles: function(tile){
		this.frontTiles.push(tile);
	},

	pushACompositeTile: function(tile){
		tile.addMeToTileSet(this);
	},

	drawBackTiles: function() {
		for(var tile in this.backTiles)
			this.backTiles[tile].draw();
	},

	drawFrontTiles: function(){
		for(var tile in this.frontTiles)
			this.frontTiles[tile].draw();	
	},

	verifyCollisionWith: function(rectangle){
		for(var tile in this.frontTiles)		
		{
			if(this.frontTiles[tile].collisionRect.isIntersected(rectangle))
				return true;
		}
		
		for(var tile in this.backTiles)		
		{
			if(this.backTiles[tile].collisionRect.isIntersected(rectangle))
				return true;
		}

		return false;
	}
});

/*------------------------------- BACKGROUND -------------------------------------------------------------------------*/
var Background = Class.extend({
	imageTile: null,
	tileCount: {row: 5, col: 10},
	tileSize: 32,
	canvasContext: {},
	topOffset: 20,

	init: function(canvasContext){
		this.imageTile = ___GLOBAL___imageRepository.get("background");
		
		this.canvasContext = canvasContext;
	},

	draw: function(){
		for(var i = 0; i < this.tileCount.row; i++)
		{
			for(var j = 0; j < this.tileCount.col; j++)
			{
				this.canvasContext.drawImage(this.imageTile, j * this.tileSize, i * this.tileSize + this.topOffset
					, this.tileSize, this.tileSize);
			}
		}
	}

})

/*-------------- CV PARTS ---------------------------------------- */
var CVPart = Tile.extend({
	frame: {x: 109, y: 148, width: 10, height: 7},
	imageSize: {width: 7, height: 5 },

	init: function(position){
		this.setUpObject(position);
		this.collisionRect = new Rectangle(position.x-3, position.y-3, this.imageSize.width+3, this.imageSize.height+3);
	}
});

var CV = Class.extend({
	parts: null,		
	_totalCVsParts: 0,

	init: function(){
		this.parts = [];
		this.parts.push(new CVPart({x: 27, y: 18}));
		this.parts.push(new CVPart({x: 286, y: 3}));
		this.parts.push(new CVPart({x: 175, y: 112}));
		this.parts.push(new CVPart({x: 110, y: 75}));
		this.parts.push(new CVPart({x: 290, y: 145 }));

		this._totalCVsParts = this.parts.length;
	},

	update: function(){

	},

	draw: function(){
		for(var i = 0; i < this.parts.length; i++)
			this.parts[i].draw();
	},

	checkIfPlayerHasPickAPartAndPickAPartIfItDoes: function(playerCollisionRect){
		var part = this.calculateCollision(playerCollisionRect);		
		if(part >= 0)
			this.hasBeenPickedUpAPart(part);

	},

	hasBeenPickedUpAPart: function(part){
		delete this.parts[part];
		this.parts.splice(part, 1);		
	},

	calculateCollision: function(playerRectangle){
		for(var i = 0; i < this.parts.length; i++)
		{
			if(this.parts[i].collisionRect.isIntersected(playerRectangle))
				return i;
		}

		return -1;
	},

	cvsPartsRemaining: function (){
		return this._totalCVsParts - this.parts.length;
	},

	totalCvsParts: function (){
		return this._totalCVsParts;
	}
});