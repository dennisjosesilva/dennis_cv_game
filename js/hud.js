var ___GLOBAL___clock;

var ___GLOBAL___setTimeFunctionInterval = function(clock){
	___GLOBAL___clock = clock;
	return setInterval(___GLOBAL___timeFunction, 1000);
};

var ___GLOBAL___timeFunction = function(){
	___GLOBAL___clock.decrease();
};

var Clock = Class.extend({
	lunchTimeInSeconds: 90,
	interval: null,

	init: function(){		
		this.interval = ___GLOBAL___setTimeFunctionInterval(this);
	},

	decrease: function(){
		this.lunchTimeInSeconds--;
	},

	getFormatedLunchTime: function(){		
		var minutes = this.lunchTimeInSeconds / 60;
		var seconds = this.lunchTimeInSeconds % 60;

		return String(Math.floor(minutes)) + ":" + this.formatSecondsOutput(seconds);
	},

	formatSecondsOutput: function(seconds)
	{
		var floorSeconds = Math.floor(seconds);
		if(floorSeconds < 10)
			return "0" + String(floorSeconds);
		else
			return String(floorSeconds);
	},

	getLunchTimeLeftInSeconds: function(){
		return this.lunchTimeInSeconds;
	}
});

var HUD = Class.extend({
	canvas: null,
	context: null,
	text: null,
	cv: null,
	clock: null,

	init: function (canvas, cv){
		this.cv = cv;
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");	
		this.clock = new Clock();
		this.text = this.getText();
	},

	getText: function(){
		return "Lunch time remaining:" +  this.clock.getFormatedLunchTime()  + "| CV parts found:" + this.cv.cvsPartsRemaining()
			+ " out " + this.cv.totalCvsParts();
	},

	update: function(){
		this.text = this.getText();
	},

	draw: function(){		
		this.setUpTextStyle();
		this.context.fillText(this.text, 3, 149);		
	},

	setUpTextStyle: function(){
		this.context.fillStyle = "#000";
		this.context.font = "7px Arial";
	},

	clearUp: function(){
		clearInterval(this.clock.interval);
	}
});