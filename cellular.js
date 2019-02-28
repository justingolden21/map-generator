function createCellularMap(percent, smoothing) {
	// make random grid
	for(let x=0; x<width; x++) {
		grid[x] = [];
		for(let y=0; y<height; y++) {
			grid[x][y] = randBool(percent);
		}
	}

	// smooth grid
	for(let i=0; i<smoothing; i++) {
		smooth();
	}

	// flood fill
	// doFloodFill(width, height);
}


function randBool(oddsOne) {
	return Math.random() >= oddsOne/100 ? 0 : 1;
}

function smooth() {
	for(let x=0; x<width; x++) {
		for(let y=0; y<height; y++) {
			let count = surroundingCount(x, y);
			grid[x][y] = count > 4 ? 1 : count < 4 ? 0 : grid[x][y];
			// new below
			// if(count==0)
				// grid[x][y] = 1;
		}
	}
}

function surroundingCount(xPos, yPos) {
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
function floodFillUtil(x, y, prevC, newC) { 
	// base cases
	if (x < 0 || x >= width || y < 0 || y >= height) 
		return; 
	if (grid[x][y] != prevC) 
		return; 

	// replace the color
	grid[x][y] = newC; 

	// recur north, east, south and west
	floodFillUtil(x+1, y, prevC, newC); 
	floodFillUtil(x-1, y, prevC, newC); 
	floodFillUtil(x, y+1, prevC, newC); 
	floodFillUtil(x, y-1, prevC, newC); 
} 
  
function floodFill(x, y, newC) {
	let prevC = grid[x][y];
	floodFillUtil(x, y, prevC, newC); 
} 


function doFloodFill(width, height) {
	let randX = randInt(0, width-1);
	let randY = randInt(0, height-1);
	floodFill(randX, randY, 2);

}

*/
