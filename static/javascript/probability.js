function chooseSpin() {
	//assign a random spin to a new photon
    var spins = [0, 1, 2, 3, 4, 5, 6, 7];
	//choose a random index from the array
	return spins[Math.floor((Math.random() * 7))];
}

var SpinEnum = {
  UP: 0,
  UPRIGHT: 1,
  RIGHT: 2,
  DOWNRIGHT: 3,
  DOWN: 4,
  DOWNLEFT: 5,
  LEFT: 6,
  UPLEFT: 7,
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
				var choices = updown[spin];
				console.log("choices are: " + choices);
				localStorage.setItem("spin", choices[Math.floor((Math.random() * (choices.length - 1)))]);
				break;
			case "LEFTRIGHT" :
				var choices = leftright[spin];
				console.log("choices are: " + choices);
				localStorage.setItem("spin", choices[Math.floor((Math.random() * (choices.length - 1)))]);
				break;
			case "UPRIGHTDOWNLEFT"	:
				var choices = uprightdownleft[spin];
				console.log("choices are: " + choices);
				localStorage.setItem("spin", choices[Math.floor((Math.random() * (choices.length - 1)))]);
				break;
			case "UPLEFTDOWNRIGHT" :
				var choices = upleftdownright[spin];
				console.log("choices are: " + choices);
				localStorage.setItem("spin", choices[Math.floor((Math.random() * (choices.length - 1)))]);
				break;
			default :
				break;
	}
}