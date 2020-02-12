
const TILE_SIZE = 32;

const DIRT = 0;
const WATER = 1;

let IMG = new Image();
IMG.src = 'tiles2.png';

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

	if(y>0 && grid[x][y-1] == DIRT) {
		dirt_above = true;
	}
	if(y < height-1 && grid[x][y+1] == DIRT) {
		dirt_below = true;
	}
	if(x > 0 && grid[x-1][y] == DIRT) {
		dirt_left = true;
	}
	if(x < width - 1 && grid[x+1][y] == DIRT) {
		dirt_right = true;
	}

	// // dirt on 4 sides
	// if(dirt_above && dirt_right && dirt_below && dirt_above) {
	// 	return [0,2]; // return dirt
	// }

	// dirt on 3 sides
	// start bug fix 3
	if(dirt_above && dirt_right && dirt_below) {
		return [0,7];
	}
	if(dirt_right && dirt_below && dirt_left) {
		return [1,7];
	}
	if(dirt_below && dirt_left && dirt_above) {
		return [2,7];
	}
	if(dirt_left && dirt_above && dirt_right) {
		return [3,7];
	}
	// end bug fix 3

	// dirt on 2 sides
	if(dirt_above && dirt_right) {
		return [4,1];
	}
	if(dirt_right && dirt_below) {
		return [5,1];
	}
	if(dirt_below && dirt_left) {
		return [6,1];
	}
	if(dirt_left && dirt_above) {
		return [7,1];
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

	// dirt on 1 side
	if(dirt_above) {
		// start bug fix 2
		if(dirt_bottom_right) {
			return [0,6];
		}
		if(dirt_bottom_left) {
			return [1,6];
		}
		// end bug fix 2
		return [0,1];
	}
	if(dirt_right) {
		// start bug fix 2
		if(dirt_bottom_left) {
			return [2,6];
		}
		if(dirt_top_left) {
			return [3,6];
		}
		// end bug fix 2
		return [1,1];
	}
	if(dirt_below) {
		// start bug fix 2
		if(dirt_top_right) {
			return [4,6];
		}
		if(dirt_top_left) {
			return [5,6];
		}
		// end bug fix 2
		return [2,1];
	}
	if(dirt_left) {
		// start bug fix 2
		if(dirt_top_right) {
			return [6,6];
		}
		if(dirt_bottom_right) {
			return [7,6];
		}
		// end bug fix 2
		return [3,1];
	}

	// test for dirt on corners

	// dirt on all 4 corners
	// start bug fix 4
	if(dirt_top_right && dirt_bottom_right && dirt_bottom_left && dirt_top_left) {
		return [5,7];
	}

	// dirt on 3 corners
	if(dirt_top_right && dirt_bottom_right && dirt_bottom_left) {
		return [4,8];
	}
	if(dirt_bottom_right && dirt_bottom_left && dirt_top_left) {
		return [5,8];
	}
	if(dirt_bottom_left && dirt_top_left && dirt_top_right) {
		return [6,8];
	}
	if(dirt_top_left && dirt_top_right && dirt_bottom_right) {
		return [7,8];
	}

	// dirt on 2 adjacent corners
	if(dirt_top_right && dirt_bottom_right) {
		return [0,8];
	}
	if(dirt_bottom_right && dirt_bottom_left) {
		return [1,8];
	}
	if(dirt_bottom_left && dirt_top_left) {
		return [2,8];
	}
	if(dirt_top_left && dirt_top_right) {
		return [3,8];
	}
	// end bug fix 4

	// dirt on 2 opposite corners
	// start bug fix 1
	if(dirt_top_right && dirt_bottom_left) {
		return [6,7];
	}
	if(dirt_top_left && dirt_bottom_right) {
		return [7,7];
	}
	// end bug fix 1

	// dirt on 1 corner
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
}

function drawTileGrid(width, height) {

	let size = ($('#size').val() || 5) / 10 * 32;

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
test condition maps:

bugs 1, 2:
importMap("01000060/////////x/////////g/////////g/////////A////////+B////////+D/////////H/Pj////8//+HB///+Af/+AA///8AP/+AAf//8AH/+AAP//8AA/+AAP//8AAf/AAf/H8AAP/gAf+D4AAP/gAP+D4AAH/gAH+D4AAD/AAH/D4APB/AAD/j4Afg+AAD/x8A/wgAAD/w+A/wAAAD/4fA/gAAAB/4fAfggAAA/wfAfw4AAA/g/APw8AAA/B/APx8AAAeB+Afx+AAAOB8A/w/AAAPA4A/w/gAAfAAAf5/gAAfgAAP//gDAPgAAH//gHgHAAAH//gHgAAAAH//wDwAAAAD//8D4AAAAA///n8AAAAAP/n/+AAAAAD/Af/AAAAAB/AD/gAYAAB/AB/wA8AAB/AAHwA8AAB/AADgB+AAB/AAAAf+AAA/gAAA/8AAA/gAAA/4AAA/AAAA/wAAA8AAMAfwAAB4AAfgfwAAB4AAf8/wAAAwAAf//gAAAgAAf//hgAAgAAf//DwAAgAAf/+DwAAgAAfn8B4AAgAAfD8A8AAAAAPB8A/GAAAAPB8B//AgAAPB8H//A4AAGA4P//h8AAAAAP//z8AAAAAH///8AAAAAH///+AAAAAH////MAAAAP////+AAAAP/////AAAAP///z/gAAAPP//g/wAAAGH//gfwAAAGA//wfgAAAHAf/4PAAAAHgA/4HAAAADwAf4HgAAADwAf8H4AAABgAP+H8AAAAAAH+D8AAAAAAH/D8AAAAAAD/n4AAAAAAD//4AAAAAAD//8AAAAAAB//+AAAAAAB///AAAAAAB///gADAAAB///gAHgAAB///gAHgAAA///gAHgAAA///gAHwAA5///gGD4AB////gPB8AB////gPg8AB////gHweAA//P/AH4eAA/+H8AP8/MAf+D4Af//+AP+B4Af//+AH/A4Af//+AH/A8Af//+AP/g+A////AP/5//////4f")
drawTileGrid(100,60)

bug 3:
importMap("01000060////////////////////////////////+f////////8P////////8P////////8H////////8H///////z+D//+H///h/AP/8D4f/A/gD/8AwP/AD4B/4AAH/AB8B/wAAD/AA+A/wADD/gAfAPwAHn/gAfAHwAP//gM/ADgAf//gf/AAAA///wf/gAAA///wf/gAAA///4f/gAAB///4P/AAABz//4H/AAABh//4H/AAADgH/4H+AAAPgD/4P8AAAfAD/4P8AAAeAD/wH8AAAOAH/wB+AAAOAH/gA+AAAeAH/gA/AAAcAH/gA/AAA4AP/gA/AABwAP/AA+AABwAP+AA+AAB4AH+AB/AAB4AH+AB/gAB8AD+AD/gAB8AB/AD/AAA4AA/wB+AAAAAA/4B+AAAAAB/4D+AAAAAD/4D8AAAAAH/4B4AAAAAH/8AAAAAAAH/+AAAAGAAD//AAAAPAAB//AAAAPgAB//AAAAPwAB/+AAAAPwAD/8AAAAPwAD/4AAAAPwAD/wAAAAHwAD/wAAAAHgAB/wAAYADAAB/gAA8AAAMB+AAA8AAAeA8AAA8BgAfA8AAA8DwAfA+AAB8D4AfA+AAD8B8AOB8AAH8B/4AB8AAH8B/8AB8AAH4A/8AB8AAD4Af8AB8AAB4AP4AB8AAB4AH4AD8AAB4AD4AD+AAD4AD4AD+AAD4AD4AD/AAB4ABwHB/wAA4AAAPg/4AAwAAAfg/4ABwAAA/g/4ABwAAA/x/4AA4AAAf//8AAQAAAP//+AAAAAAH/8/AAAAAAB/4fAAAAAAA/wfAAAAAAA/w+AAAAAAB/x8AAAAAAB/58AAAAAAD/44AAAAAAH/8AAAAAAAH/+AAAAAAAH//AAYAAAAH//AA8AAAAH//AA8AAAAD//AAYAAAAA/+AAAAAAAAf+AAAAcAAAf+AAAA+AAAP+AAAA+AAAD8AAAA+AAAB8AAAAfAAAB8AAAAfgAAB+AADg/wABj/4AHz//gf/")
drawTileGrid(100,60)

bug 4:
importMap("01000060/////////////////////5gAP///8//wAAH///4f/gAAH///4P/gAAH///8P/wAAD///+f/wAAB//////4AAA//////8AAAf////z+AAAP////h/AAAD////h/gAAB////z/wAAA//////4A4A//////4B8Af/////4B8AH/////4B4AD/////wBwAB/////wBwAB/////gBwAA////+ABwAAf///8ABwBgf///4AD4Dwf///4AD+Dw////4AB/B5////4AAfAf////4AAOAP////8AAAAH////8AAAAB////+AAAAA/////AAAAAf////gAAAAP////wAAAAP////4AAAAP///z4AAAAP///h4AAAAf///h4AAAA///nB8AAAA///AB8AAAA///AB4AAAA///AAwAAAB+f/AAAAAAD8P/gAAAAAD8H/gAAAAAB+D/gAAAAAA/B/gAAwAAA/AfAAB4AAA/APAAB4AAA+AHAAA8AAAcADAAAYAAAAABgAAAAAAAAAwAAAAAAAAAwAAAAAAAAAwAAAAAAAABwAABgAAAABwAADwAAAwAwAAD4AAB4AwAAD8AAB4A4DAH+AAB4B8HgP+AAB4B8HgP/AAA8B8DAH/gAAeB+AAH/gAAOB/AAH/AAAOB/gAP+AAAEB/gAf8AAAAB/Dg/8AAAAB+Hw/4AAAAB+P4f4AAAAA/P8f4AAAAA/P8fwAAAAA/H4fgAAAAB+HwPgA4AAB8HwHwB8AAB8D4DwB8AHx8B8BgA4AP58AeAAA4AP58APgAAAAHx+AH8AAAADx+AD+AAAAB4+AAfAAAAB8/AAPAAAAB8/AAPgAAAA8/gAPwAAAAY/gAP4AAAAA/gAP8AAAAB/AAf/AAAAD/AAf/wAAAD/gAf/4AAAD/gAf/4AAYB/AAP/wAA8A/AAH/wAA8A/AAH/4AA8A/gAH/8AA+A/gAH/8AB+A/wAD/+DB8A/4AD//nh4B/8AH///h4D//4////z8P")
drawTileGrid(100,60)

notes:
do we need sprites for:
YES water with 3 or 4 corners with dirt (ex: top right, bottom right, bottom left)
water with one side and two corners with dirt (ex: below and top right and top left)

*/
