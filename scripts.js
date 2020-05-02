let canvas, ctx;

$( ()=> {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	// listeners
	$('#generate').click(generate);
	$('input:not(#size):not(#downloadNum):not(#tileCheckbox):not(#gridCheckbox)').change(generate);
	$('#tunnelCheckbox').change( ()=> {
		if($('#tunnelCheckbox').is(':checked') ) {
			$('.tunnel').css('display','block');
			$('.cellular').css('display','none');
		} else {
			$('.tunnel').css('display','none');
			$('.cellular').css('display','block');
		}
		generate();
	});

	$('#size').change( ()=> makeGrid(width, height) );
	$('#tileCheckbox').change( ()=> {
		makeGrid(width, height);
		$('#gridCheckbox').attr('disabled', ! $('#tileCheckbox').is(':checked') );
	});
	$('#gridCheckbox').change( ()=> makeGrid(width, height) );

	// initialize
	$('.tunnel').css('display','none');
	$('#width').select();

	IMG.onload = generate;
});

document.onkeyup = function(evt) {
	if(evt.keyCode==13 && document.activeElement.id!='generate') { // enter
		generate();
	} 
};

// globals
// grid is x and y coords to draw on canvas
let grid = [], width, height;
let mapCount = 0;

function generate() {
	mapCount++;
	width = check($('#width').val(),1,800,100);
	height = check($('#height').val(),1,800,60);

	$('#width').val(width);
	$('#height').val(height);

	if($('#tunnelCheckbox').is(':checked') ) {
		let numTunnels = parseInt($('#numTunnels').val() );
		let minTunnelDist = parseInt($('#minTunnelDist').val() );
		let maxTunnelDist = parseInt($('#maxTunnelDist').val() );
		let minTunnelWidth = parseInt($('#minTunnelWidth').val() );
		let maxTunnelWidth = parseInt($('#maxTunnelWidth').val() );

		createTunnelMap(numTunnels, {min:minTunnelDist, max:maxTunnelDist}, 
			{min:minTunnelWidth, max:maxTunnelWidth});
	} else {
		let percent = Math.max(Math.min(parseInt($('#percent').val() ),100),0);
		let smoothing = Math.max(Math.min(parseInt($('#smoothing').val() ),50),0);
		$('#percent').val(percent);
		$('#smoothing').val(smoothing);

		createCellularMap(percent, smoothing);
	}

	makeGrid(width, height);
}

function check(num, min, max, defaultVal) {
	num = Math.max(Math.min(parseInt(num),max),min);
	return isNaN(num) ? defaultVal : num;
}

function makeGrid(width, height) {
	if($('#tileCheckbox').is(':checked') ) {
		drawTileGrid(width, height);
		// only grid lines for tiles
		if($('#gridCheckbox').is(':checked') ) {
			drawGridLines(width, height, 'white');
		}
	}
	else {
		drawGrid(width, height);
	}
}

function drawGrid(width, height) {
	let size = $('#size').val() || 5;
	canvas.width = width*size;
	canvas.height = height*size;
	for(let x=0; x<width; x++) {
		for(let y=0; y<height; y++) {
			ctx.fillStyle = grid[x][y] == 0 ? '#fff' : '#000';
			// ctx.fillStyle = grid[x][y] == 0 ? '#34991f' : '#2948cc';
			ctx.fillRect(x*size, y*size, size, size);
		}
	}
}

function drawGridLines(width, height, color) {
	let size = ($('#size').val() || 5) / 10 * 32; // same as from drawTileGrid
	let w = width*size;
	let h = height*size;
	ctx.strokeStyle = color;
	for(let x=0; x<w; x++) {
		for(let y=0; y<h; y++) {
			ctx.strokeRect(x*size, y*size, size, size);
		}
	}
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randPick(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

function downloadImg() {
	let a = document.createElement('a');
	a.href = document.getElementById('canvas').toDataURL('image/png');
	a.download = 'map'+mapCount+'.png';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function downloadMany() {
	let num = $('#downloadNum').val();
	for(let i=0; i<num; i++) {
		generate();
		downloadImg();
	}
}