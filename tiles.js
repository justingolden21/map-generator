
const TILE_SIZE = 32;

const DIRT = 0;
const WATER = 1;

let IMG = new Image();
IMG.src = 'tiles.png';

function drawTile(ctx, tileX, tileY, canvasX, canvasY, size) {

	let sourceX = tileX * TILE_SIZE;
	let sourceY = tileY * TILE_SIZE;

	canvasX *= size;
	canvasY *= size;

	ctx.drawImage(IMG, sourceX, sourceY, TILE_SIZE, TILE_SIZE,
		canvasX, canvasY, size, size);
}

function getTile(x, y, width, height) {
	if(grid[x][y] == DIRT)
		return [0,2];

	// else water with some dirt

	let dirt_above = false;
	let dirt_below = false;
	let dirt_left = false;
	let dirt_right = false;

	// if(x > 0 && x < width-1 && y > 0 && y < height-1) { // not edge
		if(y>0 && grid[x][y-1] == DIRT) {
			dirt_above = true;
		}
		if(y < height-1 && grid[x][y+1] == DIRT) {
			dirt_below = true;
		}
		if(x > 0 && grid[x-1][y] == DIRT) {
			dirt_right = true;
		}
		if(x < width - 1 && grid[x+1][y] == DIRT) {
			dirt_left = true;
		}

		// dirt on 3 sides
		if(dirt_above && dirt_right && dirt_below) {
			// return [4,1];
		}
		if(dirt_right && dirt_below && dirt_left) {
			// return [5,1];
		}
		if(dirt_below && dirt_left && dirt_above) {
			// return [6,1];
		}
		if(dirt_left && dirt_above && dirt_right) {
			// return [7,1];
		}

		// dirt on 2 sides
		if(dirt_above && dirt_right) {
			return [7,1];
		}
		if(dirt_right && dirt_below) {
			return [6,1];
		}
		if(dirt_below && dirt_left) {
			return [5,1];
		}
		if(dirt_left && dirt_above) {
			return [4,1];
		}

		// dirt on 1 side
		if(dirt_above) {
			return [0,1];
		}
		if(dirt_right) {
			return [3,1];
		}
		if(dirt_below) {
			return [2,1];
		}
		if(dirt_left) {
			return [1,1];
		}

		// dirt on corner

		let dirt_top_right = false;
		let dirt_bottom_right = false;
		let dirt_bottom_left = false;
		let dirt_top_left = false;

		if(x < width-1 && y > 0 && grid[x+1][y-1] == DIRT) {
			dirt_top_right = true;
		}
		if(x < width-1 && y < height-1 && grid[x+1][y+1] == DIRT) {
			dirt_bottom_right = true;
		}
		if(x > 0 && y < height-1 && grid[x-1][y+1] == DIRT) {
			dirt_bottom_left = true;
		}
		if(x > 0 && y > 0 && grid[x-1][y-1] == DIRT) {
			dirt_top_left = true;
		}

		if(dirt_top_right) {
			return [4,0];
		}
		if(dirt_bottom_right) {
			return [5,0];
		}
		if(dirt_bottom_left) {
			return [6,0];
		}
		if(dirt_top_left) {
			return [7,0];
		}


		// dirt on 0 sides
		return [randInt(0,3),0];
	// }

	// todo
	return [0,0];
}

function drawTileGrid(width, height, size=32) {
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	canvas.width = width*size;
	canvas.height = height*size;
	for(let x=0; x<width; x++) {
		for(let y=0; y<height; y++) {
			let tile = getTile(x, y, width, height);
			drawTile(ctx, tile[0], tile[1], x, y, size);
		}
	}
}



/*
importMap("01000060/////////x/////////g/////////g/////////A////////+B////////+D/////////H/Pj////8//+HB///+Af/+AA///8AP/+AAf//8AH/+AAP//8AA/+AAP//8AAf/AAf/H8AAP/gAf+D4AAP/gAP+D4AAH/gAH+D4AAD/AAH/D4APB/AAD/j4Afg+AAD/x8A/wgAAD/w+A/wAAAD/4fA/gAAAB/4fAfggAAA/wfAfw4AAA/g/APw8AAA/B/APx8AAAeB+Afx+AAAOB8A/w/AAAPA4A/w/gAAfAAAf5/gAAfgAAP//gDAPgAAH//gHgHAAAH//gHgAAAAH//wDwAAAAD//8D4AAAAA///n8AAAAAP/n/+AAAAAD/Af/AAAAAB/AD/gAYAAB/AB/wA8AAB/AAHwA8AAB/AADgB+AAB/AAAAf+AAA/gAAA/8AAA/gAAA/4AAA/AAAA/wAAA8AAMAfwAAB4AAfgfwAAB4AAf8/wAAAwAAf//gAAAgAAf//hgAAgAAf//DwAAgAAf/+DwAAgAAfn8B4AAgAAfD8A8AAAAAPB8A/GAAAAPB8B//AgAAPB8H//A4AAGA4P//h8AAAAAP//z8AAAAAH///8AAAAAH///+AAAAAH////MAAAAP////+AAAAP/////AAAAP///z/gAAAPP//g/wAAAGH//gfwAAAGA//wfgAAAHAf/4PAAAAHgA/4HAAAADwAf4HgAAADwAf8H4AAABgAP+H8AAAAAAH+D8AAAAAAH/D8AAAAAAD/n4AAAAAAD//4AAAAAAD//8AAAAAAB//+AAAAAAB///AAAAAAB///gADAAAB///gAHgAAB///gAHgAAA///gAHgAAA///gAHwAA5///gGD4AB////gPB8AB////gPg8AB////gHweAA//P/AH4eAA/+H8AP8/MAf+D4Af//+AP+B4Af//+AH/A4Af//+AH/A8Af//+AP/g+A////AP/5//////4f")
drawTileGrid(100,60)
*/
