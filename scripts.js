$( ()=> {
	// listeners
	$('#generate').click(generate);
	$('input:not(#size):not(#downloadNum):not(#tileCheckbox)').change(generate);
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
	$('#tileCheckbox').change( ()=> makeGrid(width, height) );

	// initialize
	$('.tunnel').css('display','none');
	$('#width').select();

	IMG.onload = generate;
});

document.onkeyup = function(evt) {
	if(evt.keyCode==13) { // enter
		generate();
	} 
};

// globals
// grid is x and y coords to draw on canvas
let grid = [], width, height;
let mapCount = 0;

function generate() {
	mapCount++;
	width = Math.max(Math.min(parseInt($('#width').val() ),800),1);
	height = Math.max(Math.min(parseInt($('#height').val() ),800),1);
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

function makeGrid(width, height) {
	if($('#tileCheckbox').is(':checked') ) {
		drawTileGrid(width, height);
	}
	else {
		drawGrid(width, height);
	}	
}

function drawGrid(width, height) {
	let size = $('#size').val() || 5;
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	canvas.width = width*size;
	canvas.height = height*size;
	for(let x=0; x<width; x++) {
		for(let y=0; y<height; y++) {
			ctx.fillStyle = grid[x][y] == 0 ? '#fff' : '#000';
			ctx.fillRect(x*size, y*size, size, size);
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