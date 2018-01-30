function chooseSpin() {
	//assign a random spin to a new photon
    var spins = [1, 2, 3, 4, 5, 6, 7, 8];
	//choose a random index from the array
	return spins[Math.floor((Math.random() * 7))];
}

var SpinEnum = {
  UP: 1,
  UPRIGHT: 2,
  RIGHT: 3,
  DOWNRIGHT: 4,
  DOWN: 5,
  DOWNLEFT: 6,
  LEFT: 7,
  UPLEFT: 8
};

var updown = [[SpinEnum.UP], [SpinEnum.UP, SpinEnum.UP, SpinEnum.UP, SpinEnum.DOWN], 
	[SpinEnum.UP, SpinEnum.DOWN, SpinEnum.UP, SpinEnum.DOWN], 
	[SpinEnum.UP, SpinEnum.DOWN, SpinEnum.DOWN, SpinEnum.DOWN], [SpinEnum.DOWN], 
	[SpinEnum.UP, SpinEnum.DOWN, SpinEnum.DOWN, SpinEnum.DOWN],[SpinEnum.UP, SpinEnum.DOWN, SpinEnum.UP, SpinEnum.DOWN], 
	[SpinEnum.UP, SpinEnum.UP, SpinEnum.UP, SpinEnum.DOWN]];
var leftright = [[SpinEnum.LEFT, SpinEnum.RIGHT, SpinEnum.LEFT, SpinEnum.RIGHT], 
	[SpinEnum.RIGHT, SpinEnum.RIGHT, SpinEnum.RIGHT, SpinEnum.LEFT], 
	[SpinEnum.RIGHT], [SpinEnum.RIGHT, SpinEnum.RIGHT, SpinEnum.RIGHT, SpinEnum.LEFT], 
	[SpinEnum.RIGHT, SpinEnum.LEFT, SpinEnum.LEFT, SpinEnum.RIGHT], 
	[SpinEnum.LEFT, SpinEnum.LEFT, SpinEnum.LEFT, SpinEnum.RIGHT], [SpinEnum.LEFT], 
	[SpinEnum.LEFT, SpinEnum.LEFT, SpinEnum.LEFT, SpinEnum.RIGHT]];
var uprightdownleft = [[SpinEnum.UPRIGHT, SpinEnum.UPRIGHT, SpinEnum.UPRIGHT, SpinEnum.DOWNLEFT], [SpinEnum.UPRIGHT], 
	[SpinEnum.UPRIGHT, SpinEnum.UPRIGHT, SpinEnum.UPRIGHT, SpinEnum.DOWNLEFT], 
	[SpinEnum.UPRIGHT, SpinEnum.DOWNLEFT, SpinEnum.UPRIGHT, SpinEnum.DOWNLEFT], 
	[SpinEnum.DOWNLEFT, SpinEnum.DOWNLEFT, SpinEnum.DOWNLEFT, SpinEnum.UPRIGHT], [SpinEnum.DOWNLEFT], 
	[SpinEnum.DOWNLEFT, SpinEnum.DOWNLEFT, SpinEnum.DOWNLEFT, SpinEnum.UPRIGHT], 
	[SpinEnum.UPRIGHT, SpinEnum.DOWNLEFT, SpinEnum.UPRIGHT, SpinEnum.DOWNLEFT]];
var upleftdownright = [[SpinEnum.UPLEFT, SpinEnum.UPLEFT, SpinEnum.UPLEFT, SpinEnum.DOWNRIGHT], 
	[SpinEnum.UPLEFT, SpinEnum.DOWNRIGHT, SpinEnum.DOWNRIGHT, SpinEnum.DOWNRIGHT], 
	[SpinEnum.UPLEFT, SpinEnum.DOWNRIGHT, SpinEnum.DOWNRIGHT, SpinEnum.DOWNRIGHT], [SpinEnum.DOWNRIGHT], 
	[SpinEnum.UPLEFT, SpinEnum.DOWNRIGHT, SpinEnum.DOWNRIGHT, SpinEnum.DOWNRIGHT], 
	[SpinEnum.UPLEFT, SpinEnum.UPLEFT, SpinEnum.UPLEFT, SpinEnum.DOWNRIGHT], 
	[SpinEnum.UPLEFT, SpinEnum.UPLEFT, SpinEnum.UPLEFT, SpinEnum.DOWNRIGHT], [SpinEnum.UPLEFT]];

//previous -> the spin of the photon
//direction -> direction the spin is being measured in
//set local storage spin
function measureSpin(spin, measurementDirection) {
	switch(measurementDirection) {
			case "UPDOWN" : 
				var choices = updown[spin - 1];
				console.log("choices are: " + choices);
				return choices[Math.floor((Math.random() * (choices.length - 1)))];
			case "LEFTRIGHT" :
				var choices = leftright[spin - 1];
				console.log("choices are: " + choices);
				return choices[Math.floor((Math.random() * (choices.length - 1)))];
			case "UPRIGHTDOWNLEFT"	:
				var choices = uprightdownleft[spin - 1];
				console.log("choices are: " + choices);
				return choices[Math.floor((Math.random() * (choices.length - 1)))];
			case "UPLEFTDOWNRIGHT" :
				var choices = upleftdownright[spin - 1];
				console.log("choices are: " + choices);
				return choices[Math.floor((Math.random() * (choices.length - 1)))];
			default :
				break;
	}
}