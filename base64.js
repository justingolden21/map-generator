// script to encode series of 1s and 0s to base64

const chars = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9 + /'.split(' ');

// example
console.log(getBase64([0,1,1,1,0,1,0,0,0,1,1,0,1,1,1,0,1,0,0,0,0,1]) );
console.log(decodeBase64('dG6E') );

// these functions convert an array of 1s and 0s to a base64 string, and vice versa

function getBase64(arr) {
	let rtn = '';
	for(let i=0; i<arr.length; i+=6) { // 2^6 = 64
		let num = '';
		for(let j=0; j<6; j++) {
			if(i+j >= arr.length) {
				num += '0'; // default
			}
			else {
				num += arr[i+j].toString();
			}
		}
		// console.log(num);
		num = parseInt(num, 2); // convert bin to dec
		// console.log(num);
		// console.log(chars[num]);

		rtn += chars[num];
	}
	return rtn;
}

function decodeBase64(val) {
	let rtn = [];
	for(let i=0; i<val.length; i++) {
		let idxOf = chars.indexOf(val[i]);
		// console.log(idxOf);
		let nums = idxOf.toString(2); // base 10 to base 2 str
		// console.log(nums);
		nums = padZeros(nums, 6);
		// console.log(nums);

		for(let j=0; j<nums.length; j++) {
			rtn.push(parseInt(nums[j]) );
		}
	}

	return rtn;
}

// utility function for adding zeros to the front of a number string

function padZeros(nums, len) {
	nums = nums.toString();
	return '0'.repeat(len - nums.length) + nums;
}

// more abstract functions, used to import and export map data in the form of a single string with width and height encoded

// example
// importMap('01000060//////////////////////////////////////5/////////w////j////gf//8A////Af//4Af///AP//4Mf///gH//wef4+fgH//wefwcPwP//wMfwYP4P//wAf44H8P//gAP/wH///8AAB/wH///4AAA/wP///4AAA/wf///4AAAfg/P//wAAAAB+H//wAAAAB+H//wAAAAA+H//wAAAAA+D//wAAAAAeADxwAAAAAOABg4AAAAAPABg8GAAAAPwBg+PAAAAP4Ag//AAAAH4Aw//AAAAHwB4//AAAAHwB4/+AAAADwBw/+AAAABgBw/+GAAAAABg//PAAAAABh///AAAAAAh///gAAAAAz///gAAAAA////gAAAAB/P//AAAGAB+H//AAAPAB8D//gAAPgB4B//gAAfgBwAD/AAAfwBwAB/AAAP8B4AB/AAAP/B4AB/AAMP/g4AA+AAeP/g8AAAAAeH/w8AAAAAeH/58AAAAAPD8/8AAAAMPB4f+AAAAefB4P+AAAAf/j4P/AAAAf//wH/gAAAf//gD/gAAA///gB/gAAA///gB/AAAAf//gD/AAAAP//AD/gAAAH//AB/wAAAH//AA/wAAMH//AA/wAAeH//AB/4AAfP/+AP/4AAf//8Af/8AAf//8Af/+AAf//+APj/AA8H//ADB/gA4D//ABA/4A4Dz/ABA/8A4Bg/ABA/8A4AAHgBgf4B8AADwBgPgB+AABwBAHAB/AAA4AAAAB/AAAYAgAAA/gAAcwgAAAfwAAf5gAAAPwAAP/gAAAHwAAH/gAAADgAAB/AAAAAAAAA/AAAAAAAAAPAAAAAAAAAHgAAAAAAAAHgAAAAAAAAHgAAAAAAAAHAAAAAAAAAHAAAAAAAAAHAAAAAAAAADAAAAAAAAABAAAAAAAAABgAAAAAAAABgAAAAAAAABwAAAAAAAAB/gAAAAAAAB/wAAAAAAAB/4AAAAHAAD/8AAAAPgAf//Bwzgf+M/')

function importMap(base64) {
	// first 8 chars are width/height
	let width = base64.substring(0,4); // inclusive, exclusive
	let height = base64.substring(4,8); // inclusive, exclusive

	let data = decodeBase64(base64.substring(8, base64.length) );
	console.log(data);
	grid = [];
	for(let x=0; x<width; x++) {
		grid[x] = [];
		for(let y=0; y<height; y++) {
			grid[x][y] = data[x*height+y];
			// console.log(grid[x][y]);
		}
	}
	drawGrid(width,height);
	console.log(grid);
}

function getMapData(width, height) {
	let rtn = [];
	for(let x=0; x<width; x++) {
		console.log(width);
		for(let y=0; y<height; y++) {
			rtn.push(grid[x][y]);
		}
	}

	return padZeros(width,4) + padZeros(height,4) + getBase64(rtn);
}

// example
// getMapData(100,60)
// '01000060////////////////////////////////////////z/////////h/////////g/////////gf///////nwP///////D4P//5////D8P//w////n8P//wf////4P//wP////4P//wH//z/4P//wD//h/4H//4D//h/4H//4D//x/4P//4D////4P554B////8fwwwA8/////gAAAAf////gAAAAf////gAAAAf////gA4AAP////AD/AAH////AH/gAD////gf/wYB////w//48A//x/w///+AP/g/w///+AH/g/g////AH/gfAf///gD/gPAD///gAfgPjB///gAPgP/g///gAPgf/wf//AYHgf/4D/+A8DgP/8B/8A8BwH/8B/8AYB4AB4B/+AAB8AAAA/+AAB8AAAAP+AAD8AAAAH+AAP8AAAAD8AAf+AAAAB8AAf/AGAAA8AA//APAAA4AD//gPAAA4AH//wHgAAQAH//4DwAAAAD//4DwAAAAA//4DwAAAAAf/8HwAAAAAP/+PwAAAAAB///4AAAAAA///8AAAAAA////AAAAA5////gAAAB/////gAAAB/////gAAAB/////gMAAA/////geAAA/////AeAAA////+AcAAB////+AcAAB////+A+AAA///8/B/gAAP//Afh/4AAH/+APh//+AH/+APx///AD/MAP4///AD+AAP4f//AD8AAPwf/PAD8AAHwf+HgB8AAD4f+D+B8AAB8f8B/A+AAB8fgB/A/4AB8PAD/A/8AB8GAD/B/HDA4AAD/D+Dng4AAB+D8B/w4AAB+H4A/wYAAB+fwAfwcAAB+/gAPgeAAB8/gAPAeAAA4fgAPAeAAAYfwAPAMAAAc/4APAAAAAf/4APAAAAAP/4AGAAAAAH/4AAAAAAAH/4AAAAAAAD/8AAAAAAAD/8AAAAAAAD/8AAAAcAAD/8AAAA+AAD/+AADA/AAB/+AAHh/wAB//B/////xj/'
