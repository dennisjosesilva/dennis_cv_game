var CVGame = Game.extend({
	init: function (canvas) {
		this.activeGameScene = new OpeningScene(canvas, this);		
		this.setUpKeyboardEvents();
	}
});