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
}

function randBool(oddsOfTrue) {
	return Math.random() >= oddsOfTrue/100 ? 0 : 1;
}

function smooth() {
	for(let x=0; x<width; x++) {
		for(let y=0; y<height; y++) {
			let count = surroundingCount(x, y);
			// set current point to average of surrounding
			grid[x][y] = count > 4 ? 1 : count < 4 ? 0 : grid[x][y];
			
			// add dots
			// if(count==0)
				// grid[x][y] = 1;
		}
	}
}

function surroundingCount(xPos, yPos) {
	let count = 0;
	for(let x = xPos-1; x <= xPos+1; x++) {
		for(let y = yPos-1; y <= yPos+1; y++) {
			if(x >= 0 && x < width && y >= 0 && y < height) { // inside
				if(!(x == xPos && y == yPos) ) { //don't count current tile
					count += grid[x][y]; // add 1 if true, else 0
				}
			} else { // outside, more walls on sides
				count++;
			}
		}
	}
	return count;
}
