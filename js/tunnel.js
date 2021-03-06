function createTunnelMap(numTunnels, tunnelDist, tunnelWidth) {
	// fill 1s
	for(let x=0; x<width; x++) {
		grid[x] = [];
		for(let y=0; y<height; y++) {
			grid[x][y] = 1;
		}
	}

	let startPoint = {x: randInt(0, width-1), y: randInt(0, height-1) };
	let prevDirection = randInt(0,3);
	for(let i=0; i<numTunnels; i++) {
		// don't go same horizontal/vertical as previous
		let direction = prevDirection % 2 == 0 ? randPick([1,3]) : randPick([0,2]);
		prevDirection = direction;

		startPoint = makeTunnel(startPoint, direction, randInt(tunnelDist.min, tunnelDist.max), 
			randInt(tunnelWidth.min, tunnelWidth.max) );
	}
}

// returns end point
function makeTunnel(startPoint, direction, tunnelDist, tunnelWidth) {
	let x = startPoint.x;
	let y = startPoint.y;
	for(let i=0; i<tunnelDist; i++) {
		if(x >= 0 && x < width && y >= 0 && y < height) {
			grid[x][y] = 0;

			if(tunnelWidth!=1) {
				// account for tunnelWidth
				let offset = 0;
				for(let j=1; j<=tunnelWidth; j++) {
					offset += j;
					offset *= -1;
					if(direction%2==0) { // north/south
						if(x+offset >= 0 && x+offset < width) {
							grid[x+offset][y] = 0;
						}
					} else { // east/west
						if(y+offset >= 0 && y+offset < height) {
							grid[x][y+offset] = 0;
						}
					}
				}				
			}
		} else { // if not in bounds then move in bounds
			x = Math.min(x, width-1);
			x = Math.max(x, 0);
			y = Math.min(y, height-1);
			y = Math.max(y, 0);
		}

		// move in given direction
		if(direction==0)
			y--;
		else if(direction==1)
			x++;
		else if(direction==2)
			y++;
		else
			x--;
	}

	return {x:x, y:y};
}
