$(function() {
	$('#generate').click(generate);
	$('#width').change(generate);
	$('#height').change(generate);
	$('#percent').change(generate);
	$('#smoothing').change(generate);
	generate();
});

document.onkeyup = function(evt) {
	if(evt.keyCode==13) { // enter
		generate();
	} 
};

let grid = [];

function generate() {
	let width = parseInt($('#width').val() );
	let height = parseInt($('#height').val() );
	let percent = parseInt($('#percent').val() );
	let smoothing = parseInt($('#smoothing').val() );

	console.log(width, height, percent, smoothing);

	// make random grid
	for(let x=0; x<width; x++) {
		grid[x] = [];
		for(let y=0; y<height; y++) {
			grid[x][y] = randBool(percent);
		}
	}

	// smooth grid
	for(let i=0; i<smoothing; i++) {
		smooth(width, height);
	}

	// setInterval(function() {
	// 	smooth(width, height);
	// 	drawGrid(width, height);
	// }, 1000);

	// draw grid
	drawGrid(width, height);
}

function randBool(oddsOne) {
	return Math.random() >= oddsOne/100 ? 0 : 1;
}

function smooth(width, height) {
	for(let x=0; x<width; x++) {
		for(let y=0; y<height; y++) {
			let count = surroundingCount(x, y, width, height);
			grid[x][y] = count > 4 ? 1 : count < 4 ? 0 : grid[x][y];
		}
	}
}

function surroundingCount(xPos, yPos, width, height) {
	let count = 0;
	for(let x = xPos-1; x <= xPos+1; x++) {
		for(let y = yPos-1; y <= yPos+1; y++) {
			if(x >= 0 && x < width && y >= 0 && y < height) {
				if(!(x == xPos && y == yPos) ) {
					count += grid[x][y];
				}
			} else {
				count++;
			}
		}
	}
	return count;
}

function drawGrid(width, height) {
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	canvas.width = width*5;
	canvas.height = height*5;
	for(let x=0; x<width; x++) {
		for(let y=0; y<height; y++) {
			ctx.fillStyle = grid[x][y] == 0 ? '#fff' : '#000';
			ctx.fillRect(x*5, y*5, 5, 5);
		}
	}
}