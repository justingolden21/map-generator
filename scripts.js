$(function() {
	$('#generate').click(generate);
	$('input').change(generate);
	$('#tunnelCheckbox').change(function() {
		if($(this).is(':checked') ) {
			$('.tunnel').css('display','block');
			$('.cellular').css('display','none');
		} else {
			$('.tunnel').css('display','none');
			$('.cellular').css('display','block');			
		}
		generate();
	});

	$('.tunnel').css('display','none');

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

	let numTunnels = parseInt($('#numTunnels').val() );
	let minTunnelDist = parseInt($('#minTunnelDist').val() );
	let maxTunnelDist = parseInt($('#maxTunnelDist').val() );
	let minTunnelWidth = parseInt($('#minTunnelWidth').val() );
	let maxTunnelWidth = parseInt($('#maxTunnelWidth').val() );

	if($('#tunnelCheckbox').is(':checked') ) {
		createTunnelMap(numTunnels, {min:minTunnelDist, max:maxTunnelDist}, 
			{min:minTunnelWidth, max:maxTunnelWidth}, width, height);
	} else {

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

		// flood fill
		// doFloodFill(width, height);

	}

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
			// new below
			// if(count==0)
				// grid[x][y] = 1;
		}
	}
}

function surroundingCount(xPos, yPos, width, height) {
	let count = 0;
	for(let x = xPos-1; x <= xPos+1; x++) {
		for(let y = yPos-1; y <= yPos+1; y++) {
			if(x >= 0 && x < width && y >= 0 && y < height) {
				if(!(x == xPos && y == yPos) ) { //don't count current tile
					count += grid[x][y];
				}
			} else { // more walls on sides
				count++;
			}
		}
	}
	return count;
}






/*

// recursive function repalces color at point and adjacent pixels
function floodFillUtil(x, y, prevC, newC, width, height) { 
	// base cases
	if (x < 0 || x >= width || y < 0 || y >= height) 
		return; 
	if (grid[x][y] != prevC) 
		return; 

	// replace the color
	grid[x][y] = newC; 

	// recur north, east, south and west
	floodFillUtil(x+1, y, prevC, newC, width, height); 
	floodFillUtil(x-1, y, prevC, newC, width, height); 
	floodFillUtil(x, y+1, prevC, newC, width, height); 
	floodFillUtil(x, y-1, prevC, newC, width, height); 
} 
  
function floodFill(x, y, newC, width, height) {
	let prevC = grid[x][y];
	floodFillUtil(x, y, prevC, newC, width, height); 
} 







function doFloodFill(width, height) {
	let randX = randInt(0, width-1);
	let randY = randInt(0, height-1);
	floodFill(randX, randY, 2, width, height);

}
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}


*/


function drawGrid(width, height) {
	let size = 5;
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	canvas.width = width*size;
	canvas.height = height*size;
	for(let x=0; x<width; x++) {
		for(let y=0; y<height; y++) {
			ctx.fillStyle = grid[x][y] == 0 ? '#fff' : '#000';
			// ctx.fillStyle = grid[x][y] == 0 ? '#fff' : grid[x][y] == 1 ? '#000' : '#00f';
			ctx.fillRect(x*size, y*size, size, size);
		}
	}
}